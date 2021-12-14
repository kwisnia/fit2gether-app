import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider as PaperProvider, useTheme } from "react-native-paper";
import { combinedDefaultTheme, combinedDarkTheme } from "./styles/theme";
import { ThemeContext } from "./context/ThemeContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NavAppBar from "./components/NavAppBar";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Placeholder
function CalendarScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Home!</Text>
        </View>
    );
}

function TasksScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Settings!</Text>
        </View>
    );
}

function ProgressScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Progress!</Text>
        </View>
    );
}
// Placeholder

const MainTabNavigator = () => {
    const theme = useTheme();
    const { isThemeDark } = React.useContext(ThemeContext);

    return (
        <Tab.Navigator
            shifting={true}
            inactiveColor="white"
            activeColor={
                isThemeDark ? theme.colors.accentDark : theme.colors.accentLight
            }
            // screenOptions={
            //     {
            //         header: (props) => <NavAppBar {...props} />,
            //     }
            // }
        >
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarLabel: "Calendar",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="calendar-blank"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Tasks"
                component={TasksScreen}
                options={{
                    tabBarLabel: "Tasks",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="clipboard-list-outline"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Progress"
                component={ProgressScreen}
                options={{
                    tabBarLabel: "Progress",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="trending-up"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

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
                            // headerShown: false,
                            header: (props) => <NavAppBar {...props} />,
                        }}
                        initialRouteName="Login"
                    >
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen
                            name="MainApp"
                            component={MainTabNavigator}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </ThemeContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default App;
