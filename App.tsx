import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { combinedDefaultTheme, combinedDarkTheme } from "./styles/theme";
import { ThemeContext } from "./context/ThemeContext";
import TabNavigator from "./navigation/TabNavigator";

const Stack = createNativeStackNavigator();

const App = () => {
    const [isThemeDark, setIsThemeDark] = React.useState(false);
    const [theme, setTheme] = React.useState(combinedDefaultTheme);

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
        <ThemeContext.Provider value={preferences}>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName="Login"
                    >
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="MainApp" component={TabNavigator} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </ThemeContext.Provider>
    );
};

export default App;
