import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
    DrawerItem,
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { TabContext } from "../context/TabContext";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import { SessionContext } from "../context/SessionContext";
import RNPickerSelect from "react-native-picker-select";

const DrawerContent: React.FunctionComponent<DrawerContentComponentProps> = (
    props
) => {
    const { themes, isThemeDark, setTheme } = React.useContext(ThemeContext);
    const theme = useTheme();
    const { tab: active, setTab: setActive } = React.useContext(TabContext);
    const itemStyle = {
        activeTintColor: "white",
        activeBackgroundColor: theme.colors.accent,
        inactiveTintColor: isThemeDark ? "white" : theme.colors.primaryDark,
    };
    const [sessionInfo, refreshSessionInfo] = useContext(SessionContext);
    const isFocused = useIsFocused();

    React.useEffect(() => {
        if (isFocused) {
            refreshSessionInfo();
        }
    }, [isFocused, refreshSessionInfo]);

    const logout = async () => {
        await SecureStore.deleteItemAsync("session");
        refreshSessionInfo();
        props.navigation.closeDrawer();
        props.navigation.navigate("Login");
    };
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <Avatar.Image
                        size={50}
                        source={{
                            uri: "https://cdn.discordapp.com/attachments/694564497662148679/915549066878922762/unknown.png",
                        }}
                    ></Avatar.Image>
                    <Title
                        style={{
                            ...styles.title,
                            color: isThemeDark
                                ? "white"
                                : theme.colors.primaryDark,
                        }}
                    >
                        {sessionInfo ? sessionInfo.username : "User"}
                    </Title>
                    <Caption
                        style={{
                            ...styles.caption,
                            color: isThemeDark
                                ? "white"
                                : theme.colors.primaryDark,
                        }}
                    >
                        {sessionInfo ? sessionInfo.email : "example@email.com"}
                    </Caption>
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: theme.colors.primary,
                    borderBottomWidth: 1,
                }}
            />
            <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Buddy system"
                    focused={active === "Buddy System"}
                    onPress={() => {
                        setActive("Buddy System");
                        props.navigation.navigate("Buddy");
                    }}
                    labelStyle={styles.drawerItem}
                    {...itemStyle}
                />
                {sessionInfo?.buddyId ? (
                    <View>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="calendar-blank"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Calendar"
                            focused={active === "Calendar"}
                            onPress={() => {
                                setActive("Calendar");
                                props.navigation.navigate("TabNavigator", {
                                    screen: "Tabs",
                                });
                            }}
                            {...itemStyle}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="view-list-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Tasks"
                            focused={active === "Tasks"}
                            onPress={() => {
                                setActive("Tasks");
                                props.navigation.navigate("TabNavigator", {
                                    screen: "Tabs",
                                });
                            }}
                            {...itemStyle}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="trending-up"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Progress"
                            focused={active === "Progress"}
                            onPress={() => {
                                setActive("Progress");
                                props.navigation.navigate("TabNavigator", {
                                    screen: "Tabs",
                                });
                            }}
                            {...itemStyle}
                        />
                    </View>
                ) : null}
            </Drawer.Section>
            <View
                style={{
                    borderBottomColor: theme.colors.primary,
                    borderBottomWidth: 1,
                }}
            />
            <Drawer.Section style={styles.drawerSection}>
                <RNPickerSelect
                    onValueChange={(value: string) => {
                        console.log(value);
                        setTheme(value);
                    }}
                    placeholder={{}}
                    items={themes.map((theme) => ({
                        value: theme.name,
                        label: theme.name,
                    }))}
                >
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="eye"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Theme"
                        onPress={() => {}}
                        {...itemStyle}
                    />
                </RNPickerSelect>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons
                            name="cog-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Settings"
                    onPress={() => {
                        setActive("Settings");
                        props.navigation.navigate("TabNavigator", {
                            screen: "Settings",
                        });
                    }}
                    {...itemStyle}
                />
                <DrawerItem label="Logout" onPress={logout} />
            </Drawer.Section>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingTop: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: "600",
        fontSize: 24,
    },
    caption: {
        fontSize: 16,
        lineHeight: 18.78,
        fontWeight: "bold",
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    drawerItem: {
        fontWeight: "500",
    },
});

export default DrawerContent;
