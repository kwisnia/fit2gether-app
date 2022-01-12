import React from "react";
import { BottomNavigation, useTheme } from "react-native-paper";
import { LogBox, Settings } from "react-native";
import NavAppBar from "../components/NavAppBar";
import { ThemeContext } from "../context/ThemeContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "../screens/CalendarScreen";
import TasksScreen from "../screens/TasksScreen";
import ProgressScreen from "../screens/ProgressScreen";
import { TabContext } from "../context/TabContext";
import SettingsScreen from "../screens/SettingsScreen";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

const Stack = createNativeStackNavigator();

const Tabs = () => {
    const { tab, setTab } = React.useContext(TabContext);
    const theme = useTheme();
    const { isThemeDark } = React.useContext(ThemeContext);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "calendar", title: "Calendar", icon: "calendar-blank" },
        { key: "tasks", title: "Tasks", icon: "clipboard-list-outline" },
        { key: "progress", title: "Progress", icon: "trending-up" },
        { key: "settings", title: "Settings", icon: "cog-outline" },
    ]);
    const renderScene = BottomNavigation.SceneMap({
        calendar: CalendarScreen,
        tasks: TasksScreen,
        progress: ProgressScreen,
        settings: SettingsScreen,
    });

    React.useEffect(() => {
        const index = routes.findIndex((route) => route.title === tab);
        if (index !== -1) {
            setIndex(index);
        }
    }, [tab, routes]);

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            onTabPress={({ route }) => setTab(route.title || "")}
            shifting={true}
            inactiveColor="white"
            activeColor={
                isThemeDark ? theme.colors.accentDark : theme.colors.accentLight
            }
        />
    );
};

const TabNavigator = () => {
    const { tab } = React.useContext(TabContext);

    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <NavAppBar title={tab} />,
            }}
        >
            <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
    );
};

export default TabNavigator;
