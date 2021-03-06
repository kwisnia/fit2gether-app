import React, { useContext } from "react";
import { BottomNavigation, useTheme } from "react-native-paper";
import { LogBox } from "react-native";
import NavAppBar from "../components/NavAppBar";
import { ThemeContext } from "../context/ThemeContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "../screens/CalendarScreen";
import TasksScreen from "../screens/TasksScreen";
import ProgressScreen from "../screens/ProgressScreen";
import { TabContext } from "../context/TabContext";
import SettingsScreen from "../screens/SettingsScreen";
import BuddySystemScreen from "../screens/BuddySystemScreen";
import { SessionContext } from "../context/SessionContext";

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
    ]);
    const renderScene = BottomNavigation.SceneMap({
        calendar: CalendarScreen,
        tasks: TasksScreen,
        progress: ProgressScreen,
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
    const [sessionInfo] = useContext(SessionContext);

    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <NavAppBar title={tab} />,
                animation: "none",
            }}
        >
            {sessionInfo?.buddyId ? (
                <Stack.Screen name="Tabs" component={Tabs} />
            ) : null}
            <Stack.Screen name="Buddy" component={BuddySystemScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default TabNavigator;
