"use client"
import { useTheme } from "next-themes";


export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-card border border-border text-custom-txt-secondary hover:text-foreground hover:border-primary/40 transition-colors focus:outline-none"
            title="Toggle theme"
        >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 hidden dark:block text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M5.25 12H3m18 0h-2.25m-2.81-7.19l-1.59 1.59M7.94 16.06l-1.59 1.59m11.18 1.18l-1.59-1.59m-11.18-11.18l-1.59-1.59M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 block dark:hidden text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12.83A9.53 9.53 0 0112 21.75c-5.27 0-9.5-4.23-9.5-9.5a9.53 9.53 0 0112.83-9.75 7.5 7.5 0 001.61 8 .5a7.5 7.5 0 008 1.61z" />
            </svg>
        </button>

    )
}