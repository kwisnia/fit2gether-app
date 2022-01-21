import React from "react";
import { combinedDefaultTheme } from "../styles/theme";
import { Theme } from "../types/Theme";

export const ThemeContext = React.createContext({
    theme: combinedDefaultTheme,
    themes: [] as Theme[],
    isThemeDark: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTheme: (_: string) => {},
});
