import { combinedDefaultTheme } from "../styles/theme";

export interface Theme {
    id: number;
    theme: typeof combinedDefaultTheme;
    name: string;
    isDark: boolean;
}
