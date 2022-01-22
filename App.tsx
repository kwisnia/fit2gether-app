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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useSession from "./hooks/useSession";
import { SessionContext } from "./context/SessionContext";
import useThemeSwitcher from "./hooks/useThemeSwitcher";

registerTranslation("en-GB", enGB);
axios.defaults.baseURL = "https://fit2gether-api.herokuapp.com";

const App = () => {
    const Stack = createNativeStackNavigator();
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
                                <ActivityIndicator />
                            ) : initialRouteName ? (
                                <NavigationContainer theme={theme}>
                                    <Stack.Navigator
                                        screenOptions={{
                                            headerShown: false,
                                        }}
                                        initialRouteName={initialRouteName}
                                    >
                                        <Stack.Screen
                                            name="Login"
                                            component={LoginScreen}
                                        />
                                        {sessionInfo ? (
                                            <Stack.Screen
                                                name="MainApp"
                                                component={DrawerNavigator}
                                            />
                                        ) : null}
                                    </Stack.Navigator>
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
