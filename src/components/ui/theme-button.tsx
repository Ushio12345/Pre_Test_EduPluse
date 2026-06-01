"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../icon/social-icon";
import { Button } from "./button";

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant={'ghost'}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            size={'icon'}
            title="Toggle theme"
        >

            <SunIcon />
            <MoonIcon />


        </Button>
    );
}