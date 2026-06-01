import { useState, useEffect, useRef } from "react";
import { Badge } from "../ui/badge";
import { Timer } from "lucide-react";

interface AccurateTimerProps {
    initialMinutes: number;
    onTimeout?: () => void;
}

export default function AccurateTimer({ initialMinutes = 10, onTimeout }: AccurateTimerProps) {

    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

    const endTimeRef = useRef<number>(Date.now() + initialMinutes * 60 * 1000);

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));

            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(timer);
                if (onTimeout) onTimeout();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeout]);


    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    const format = (num: number) => String(num).padStart(2, '0');

    return (
        <Badge
            variant="outline"
            className="px-2 py-1 text-sm font-semibold tracking-wide flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-mono shadow-sm rounded-xl select-none"
        >
            <Timer className="h-4 w-4  shrink-0" />

            <div className="flex items-center gap-0.5 tabular-nums">
                {hours > 0 && (
                    <>
                        <span>{format(hours)}</span>
                        <span className="animate-pulse mx-0.5">:</span>
                    </>
                )}
                <span>{format(minutes)}</span>
                <span className="animate-pulse mx-0.5">:</span>
                <span className="text-amber-700 dark:text-amber-300 font-bold">
                    {format(seconds)}
                </span>
            </div>
        </Badge>
    );
}