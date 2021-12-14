import React from "react";
import { View, StyleSheet } from "react-native";
import {
    DrawerItem,
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

const DrawerContent: React.FunctionComponent<DrawerContentComponentProps> = (
    props
) => {
    const { isThemeDark, toggleTheme } = React.useContext(ThemeContext);
    const theme = useTheme();
    const [active, setActive] = React.useState("");
    const itemStyle = {
        activeTintColor: "white",
        activeBackgroundColor: theme.colors.accent,
        inactiveTintColor: isThemeDark ? "white" : theme.colors.primaryDark,
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
                        User
                    </Title>
                    <Caption
                        style={{
                            ...styles.caption,
                            color: isThemeDark
                                ? "white"
                                : theme.colors.primaryDark,
                        }}
                    >
                        user@example.com
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
                    focused={active === "plz"}
                    onPress={() => {
                        setActive("plz");
                        props.navigation.navigate("Plz");
                    }}
                    labelStyle={styles.drawerItem}
                    {...itemStyle}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons
                            name="calendar-blank"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Calendar"
                    onPress={() => {
                        props.navigation.navigate("Plz");
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
                    onPress={() => {
                        props.navigation.navigate("Plz");
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
                    onPress={() => {
                        props.navigation.navigate("Plz");
                    }}
                    {...itemStyle}
                />
            </Drawer.Section>
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
                            name="eye"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Theme"
                    onPress={() => {
                        toggleTheme();
                    }}
                    {...itemStyle}
                />
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
                        props.navigation.navigate("Plz");
                    }}
                    {...itemStyle}
                />
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
