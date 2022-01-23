import React, { useContext } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import {
    DrawerItem,
    DrawerContentScrollView,
    DrawerContentComponentProps,
    useDrawerStatus,
} from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { TabContext } from "../context/TabContext";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import { SessionContext } from "../context/SessionContext";
import RNPickerSelect from "react-native-picker-select";
import { PairInfo } from "../types/PairInfo";
import axios, { AxiosResponse } from "axios";
import { AVATARS } from "../components/settings/avatars";

const DrawerContent: React.FunctionComponent<DrawerContentComponentProps> = (
    props
) => {
    const { themes, isThemeDark, setTheme } = React.useContext(ThemeContext);
    const theme = useTheme();
    const { tab, setTab } = React.useContext(TabContext);
    const itemStyle = {
        activeTintColor: "white",
        activeBackgroundColor: theme.colors.accent,
        inactiveTintColor: isThemeDark ? "white" : theme.colors.primaryDark,
    };
    const [sessionInfo, refreshSessionInfo] = useContext(SessionContext);
    const isFocused = useIsFocused();
    const [pairInfo, setPairInfo] = React.useState<PairInfo | null>(null);
    const [pickerValue, setPickerValue] = React.useState(
        sessionInfo?.selectedTheme
    );
    const isDrawerOpen = useDrawerStatus() === "open";

    const fetchPairInfo = async () => {
        const pair: AxiosResponse<PairInfo> = await axios.get("/pairInfo");
        setPairInfo(pair.data);
    };
    React.useEffect(() => {
        if (isFocused) {
            refreshSessionInfo();
        }
    }, [isFocused, refreshSessionInfo]);

    React.useEffect(() => {
        void fetchPairInfo();
    }, [sessionInfo]);

    React.useEffect(() => {
        if (isDrawerOpen) {
            void fetchPairInfo();
        }
    }, [isDrawerOpen]);

    const logout = async () => {
        await SecureStore.deleteItemAsync("session");
        refreshSessionInfo();
        props.navigation.closeDrawer();
    };
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <Avatar.Image
                        size={50}
                        source={AVATARS[sessionInfo?.profilePicture || 1]}
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
                    focused={tab === "Buddy System"}
                    onPress={() => {
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
                            focused={tab === "Calendar"}
                            onPress={() => {
                                setTab("Calendar");
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
                            focused={tab === "Tasks"}
                            onPress={() => {
                                setTab("Tasks");
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
                            focused={tab === "Progress"}
                            onPress={() => {
                                setTab("Progress");
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
                        setTheme(value);
                        setPickerValue(value);
                    }}
                    value={pickerValue}
                    placeholder={{}}
                    items={themes
                        .slice(
                            0,
                            2 +
                                Math.floor(
                                    (pairInfo &&
                                        pairInfo?.experienceLevel / 3) ||
                                        1
                                )
                        )
                        .map((theme) => ({
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
                        props.navigation.navigate("TabNavigator", {
                            screen: "Settings",
                        });
                    }}
                    {...itemStyle}
                />
                <DrawerItem label="Logout" onPress={logout} />
                <DrawerItem
                    label="NFT Metaverse"
                    onPress={() => BackHandler.exitApp()}
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
    drawerSection: {
        marginTop: 15,
    },
    drawerItem: {
        fontWeight: "500",
    },
});

export default DrawerContent;
