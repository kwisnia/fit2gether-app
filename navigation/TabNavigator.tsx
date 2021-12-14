import React from "react";
import { BottomNavigation, useTheme } from "react-native-paper";
import { View, Text, LogBox } from "react-native";
import NavAppBar from "../components/NavAppBar";
import { ThemeContext } from "../context/ThemeContext";
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

const Stack = createNativeStackNavigator();

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

type TabsScreenNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    "Tabs"
>;

const Tabs = ({ route }: TabsScreenNavigationProp) => {
    const { setTitle } = route.params;
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

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            onTabPress={({ route }) => setTitle(route.title)}
            shifting={true}
            inactiveColor="white"
            activeColor={
                isThemeDark ? theme.colors.accentDark : theme.colors.accentLight
            }
        />
    );
};

const TabNavigator = () => {
    const [title, setTitle] = React.useState("Calendar");

    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <NavAppBar title={title} />,
            }}
        >
            <Stack.Screen
                name="Tabs"
                component={Tabs}
                initialParams={{ setTitle }}
            />
        </Stack.Navigator>
    );
};

export default TabNavigator;
