import React from "react";
import {
    combinedDefaultTheme,
    combinedDarkTheme,
    combinedLightPinkTheme,
    combinedDarkPineTheme,
    combinedLightBoyWhoLivedTheme,
    combinedLightPowderTheme,
} from "../styles/theme";
import { Theme } from "../types/Theme";
import useSession from "./useSession";

const useThemeSwitcher = (): [
    typeof combinedDefaultTheme,
    Theme[],
    boolean,
    (_: string) => void
] => {
    const themes = React.useMemo(
        () => [
            {
                id: 0,
                theme: combinedDefaultTheme,
                name: "Default",
                isDark: false,
            },
            {
                id: 1,
                theme: combinedDarkTheme,
                name: "Dark",
                isDark: true,
            },
            {
                id: 2,
                theme: combinedLightPinkTheme,
                name: "Pink",
                isDark: false,
            },
            {
                id: 3,
                theme: combinedDarkPineTheme,
                name: "Pine",
                isDark: true,
            },
            {
                id: 4,
                theme: combinedLightBoyWhoLivedTheme,
                name: "Boy who lived",
                isDark: false,
            },
            {
                id: 5,
                theme: combinedLightPowderTheme,
                name: "Powder",
                isDark: false,
            },
        ],
        []
    );
    const [session] = useSession();

    const [theme, setSelectedTheme] = React.useState(
        session
            ? themes.find((theme) => theme.name === session.selectedTheme)
                ?.theme || combinedDefaultTheme
            : combinedDefaultTheme
    );
    const [isThemeDark, setIsThemeDark] = React.useState(false);

    React.useEffect(() => {
        setIsThemeDark(themes.find((e) => e.theme === theme)?.isDark || false);
    }, [theme, themes]);

    React.useEffect(() => {
        setSelectedTheme(
            themes.find((theme) => theme.name === session?.selectedTheme)
                ?.theme || combinedDefaultTheme
        );
    }, [session, themes]);

    const setTheme = React.useCallback(
        (name: string) => {
            setSelectedTheme(
                themes.find((e) => e.name === name)?.theme ||
                    combinedDefaultTheme
            );
        },
        [themes]
    );

    return [theme, themes, isThemeDark, setTheme];
};

export default useThemeSwitcher;
