import React from "react";
import "intl";
import "intl/locale-data/jsonp/en";
import { NavigationContainer } from "@react-navigation/native";
import {
    ActivityIndicator,
    Provider as PaperProvider,
} from "react-native-paper";
import { ThemeContext } from "./context/ThemeContext";
import { TabContext } from "./context/TabContext";
import DrawerNavigator from "./navigation/DrawerNavigation";
import { enGB, registerTranslation } from "react-native-paper-dates";
import axios from "axios";
import LoginScreen from "./screens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useSession from "./hooks/useSession";
import { SessionContext } from "./context/SessionContext";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import SplashScreen from "./screens/SplashScreen";
import { StatusBar } from "expo-status-bar";

registerTranslation("en-GB", enGB);
axios.defaults.baseURL = "https://fit2gether-api.herokuapp.com";

const App = () => {
    const [theme, themes, isThemeDark, setTheme] = useThemeSwitcher();
    const [tab, setTab] = React.useState("Calendar");
    const [initialRouteName, setInitialRouteName] = React.useState("");
    const [sessionInfo, refreshSessionInfo, updateSession, isInitialLoading] =
        useSession();

    React.useEffect(() => {
        setInitialRouteName(sessionInfo ? "MainApp" : "Login");
    }, [sessionInfo]);

    React.useEffect(() => {
        if (sessionInfo) {
            updateSession({
                ...sessionInfo,
                selectedTheme:
                    themes.find((e) => e.theme === theme)?.name || "Default",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, themes, updateSession, sessionInfo?.id]);

    return (
        <SafeAreaProvider>
            <TabContext.Provider value={{ tab, setTab }}>
                <ThemeContext.Provider
                    value={{
                        theme,
                        themes,
                        isThemeDark,
                        setTheme,
                    }}
                >
                    <SessionContext.Provider
                        value={[sessionInfo, refreshSessionInfo, updateSession]}
                    >
                        <PaperProvider theme={theme}>
                            {isInitialLoading ? (
                                <SplashScreen />
                            ) : initialRouteName ? (
                                <NavigationContainer theme={theme}>
                                    <StatusBar
                                        style={isThemeDark ? "light" : "dark"}
                                        backgroundColor={
                                            isThemeDark
                                                ? theme.colors.primaryDark
                                                : theme.colors.primary
                                        }
                                    />
                                    {sessionInfo ? (
                                        <DrawerNavigator />
                                    ) : (
                                        <LoginScreen />
                                    )}
                                </NavigationContainer>
                            ) : (
                                <ActivityIndicator />
                            )}
                        </PaperProvider>
                    </SessionContext.Provider>
                </ThemeContext.Provider>
            </TabContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;
