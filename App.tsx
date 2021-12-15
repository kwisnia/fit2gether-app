import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { combinedDefaultTheme, combinedDarkTheme } from "./styles/theme";
import { ThemeContext } from "./context/ThemeContext";
import { TabContext } from "./context/TabContext";
import DrawerNavigator from "./navigation/DrawerNavigation";

const App = () => {
    const [isThemeDark, setIsThemeDark] = React.useState(false);
    const [theme, setTheme] = React.useState(combinedDefaultTheme);
    const [tab, setTab] = React.useState("calendar");

    React.useEffect(() => {
        isThemeDark
            ? setTheme(combinedDarkTheme)
            : setTheme(combinedDefaultTheme);
    }, [isThemeDark]);

    const toggleTheme = React.useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );

    return (
        <TabContext.Provider value={{ tab, setTab }}>
            <ThemeContext.Provider value={preferences}>
                <PaperProvider theme={theme}>
                    <NavigationContainer theme={theme}>
                        <DrawerNavigator />
                    </NavigationContainer>
                </PaperProvider>
            </ThemeContext.Provider>
        </TabContext.Provider>
    );
};

export default App;
