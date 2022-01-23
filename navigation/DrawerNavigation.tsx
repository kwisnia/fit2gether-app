import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DrawerContent from "./DrawerContent";
import TabNavigator from "./TabNavigator";

const DrawerNavigator: React.FunctionComponent = () => {
    const Drawer = createDrawerNavigator();
    const theme = useTheme();
    return (
        <Drawer.Navigator
            initialRouteName="TabNavigator"
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: theme.colors.background,
                },
            }}
        >
            <Drawer.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account-outline"
                            color={color}
                            size={size}
                        />
                    ),
                    drawerItemStyle: {
                        display: "none",
                    },
                }}
            />
        </Drawer.Navigator>
    );
};
export default DrawerNavigator;
