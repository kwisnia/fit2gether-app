import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

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
        background: "#ff9b61",
    },
};

export const combinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        primary: "#a85428",
        primaryLight: "#de8253",
        primaryDark: "#742800",
        accent: "#da4167",
        accentLight: "#ff7595",
        accentDark: "#a3003d",
        //Not sure about those two
        surface: "#742800",
        background: "#de8253",
    },
};
