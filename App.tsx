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
import * as SecureStore from "expo-secure-store";
import { SessionInfo } from "./types/SessionInfo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

registerTranslation("en-GB", enGB);
axios.defaults.baseURL = "https://fit2gether-api.herokuapp.com";

const App = () => {
    const Stack = createNativeStackNavigator();
    const [isThemeDark, setIsThemeDark] = React.useState(false);
    const [theme, setTheme] = React.useState(combinedDefaultTheme);
    const [tab, setTab] = React.useState("calendar");
    const [initialRouteName, setInitialRouteName] = React.useState("");

    React.useEffect(() => {
        const getFromStorage = async () => {
            const result = await SecureStore.getItemAsync("session");
            console.log(result);
            if (result) {
                const sessionInfo = JSON.parse(result) as SessionInfo;
                setInitialRouteName("MainApp");
                axios.defaults.headers.common.Authorization = `Bearer ${sessionInfo.token.accessToken}`;
            } else {
                setInitialRouteName("Login");
            }
        };
        void getFromStorage();
    }, []);

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
                    <PaperProvider theme={theme}>
                        {initialRouteName ? (
                            <NavigationContainer theme={theme}>
                                <Stack.Navigator
                                    screenOptions={{
                                        headerShown: false,
                                        // headerStyle: {
                                        //     backgroundColor:
                                        //         theme.colors.background,
                                        // },
                                    }}
                                    initialRouteName={initialRouteName}
                                >
                                    <Stack.Screen
                                        name="Login"
                                        component={LoginScreen}
                                    />
                                    <Stack.Screen
                                        name="MainApp"
                                        component={DrawerNavigator}
                                    />
                                </Stack.Navigator>
                            </NavigationContainer>
                        ) : (
                            <ActivityIndicator />
                        )}
                    </PaperProvider>
                </ThemeContext.Provider>
            </TabContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;
