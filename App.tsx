import React from "react";
import "intl";
import "intl/locale-data/jsonp/en";
import { NavigationContainer } from "@react-navigation/native";
import {
    ActivityIndicator,
    Provider as PaperProvider,
} from "react-native-paper";
import {
    combinedDefaultTheme,
    combinedDarkTheme,
    combinedLightPinkTheme,
    combinedDarkPineTheme,
    combinedLightBoyWhoLivedTheme,
    combinedLightPowderTheme,
} from "./styles/theme";
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

registerTranslation("en-GB", enGB);
axios.defaults.baseURL = "https://fit2gether-api.herokuapp.com";

const App = () => {
    const Stack = createNativeStackNavigator();
    const [isThemeDark, setIsThemeDark] = React.useState(false);
    const [theme, setTheme] = React.useState(combinedDefaultTheme);
    const [tab, setTab] = React.useState("Calendar");
    const [initialRouteName, setInitialRouteName] = React.useState("");
    const [sessionInfo, refreshSessionInfo, updateSession] = useSession();

    React.useEffect(() => {
        if (sessionInfo) {
            setInitialRouteName("MainApp");
        } else {
            setInitialRouteName("Login");
        }
        setTab(sessionInfo?.buddyId ? "Calendar" : "Buddy System");
    }, [sessionInfo]);

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
        <SafeAreaProvider>
            <TabContext.Provider value={{ tab, setTab }}>
                <ThemeContext.Provider value={preferences}>
                    <SessionContext.Provider
                        value={[sessionInfo, refreshSessionInfo, updateSession]}
                    >
                        <PaperProvider theme={theme}>
                            {initialRouteName ? (
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
