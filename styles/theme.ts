import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ReactNativePaper {
        interface ThemeColors {
            primaryLight: string;
            primaryDark: string;
            accentLight: string;
            accentDark: string;
        }
    }
}

export const combinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: "#d26b35",
        primaryLight: "#ff9b61",
        primaryDark: "#9b3e06",
        accent: "#f06292",
        accentLight: "#ff94c2",
        accentDark: "#ba2d65",
        //Not sure about those two
        surface: "#9b3e06",
        background: "#FFDFCD",
    },
};

export const combinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        primary: "#241A15",
        primaryLight: "#1F1714",
        primaryDark: "#402b21",
        accent: "#da4167",
        accentLight: "#a3003d",
        accentDark: "#ff7595",
        //Not sure about those two
        surface: "#301F16",
        background: "#121212",
    },
};

export const combinedLightPinkTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: "#F5A7BC",
        primaryLight: "#FFD9EE",
        primaryDark: "#C1778C",
        accent: "#005A36",
        accentLight: "#3C8860",
        accentDark: "#002F10",
        //Not sure about those two
        surface: "#C1778C",
        background: "#FCE1F0",
    },
};

export const combinedDarkPineTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        primary: "#005A36",
        primaryLight: "#002F10",
        primaryDark: "#3C8860",
        accent: "#F5A7BC",
        accentLight: "#C1778C",
        accentDark: "#FFD9EE",
        //Not sure about those two
        surface: "#3C8860",
        background: "#121212",
    },
};

export const combinedLightBoyWhoLivedTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: "#BA68C8",
        primaryLight: "#EE98FB",
        primaryDark: "#883997",
        accent: "#FFCE61",
        accentLight: "#FFFF92",
        accentDark: "#C99D31",
        //Not sure about those two
        surface: "#883997",
        background: "#F6B7FF",
    },
};

export const combinedLightPowderTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: "#B6BCBC",
        primaryLight: "#E8EEEE",
        primaryDark: "#868C8C",
        accent: "#F98D94",
        accentLight: "#FFBFC4",
        accentDark: "#C35D66",
        //Not sure about those two
        surface: "#868C8C",
        background: "#E9F0F0",
    },
};
