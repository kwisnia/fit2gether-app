/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme, Surface, Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Camera } from "expo-camera";
import { AVATARS } from "../settings/avatars";
import { SessionContext } from "../../context/SessionContext";

const YourBuddySurface: React.FunctionComponent<{
    buddy: string | null;
    setScanning: (_: boolean) => void;
}> = ({ buddy, setScanning }) => {
    const theme = useTheme();
    const [sessionInfo] = React.useContext(SessionContext);

    return (
        <Surface
            style={{
                margin: 10,
                backgroundColor: theme.colors.primaryLight,
            }}
        >
            <View
                style={{
                    ...styles.contentContainer,
                    backgroundColor: theme.colors.primary,
                }}
            >
                <MaterialCommunityIcons
                    name="account-outline"
                    color={theme.colors.accentLight}
                    size={32}
                    style={{ ...styles.icon, marginVertical: 15 }}
                />
                <Text style={styles.buddyTitle}> Your Buddy</Text>
            </View>
            <Surface
                style={[
                    styles.contentContainer,
                    {
                        justifyContent: "space-between",
                        backgroundColor: theme.colors.primary,
                        margin: 15,
                        borderRadius: 2,
                    },
                ]}
            >
                <Pressable
                    style={styles.contentContainer}
                    onPress={async () => {
                        if (!buddy) {
                            const { status } =
                                await Camera.requestCameraPermissionsAsync();
                            if (status === "granted") {
                                setScanning(true);
                            }
                        }
                    }}
                >
                    <Avatar.Image
                        size={40}
                        source={AVATARS[sessionInfo?.buddyProfilePicture || 1]}
                        style={styles.icon}
                    ></Avatar.Image>
                    <Text
                        style={{
                            ...styles.buddyTitle,
                            fontSize: 22,
                            fontWeight: "500",
                        }}
                    >
                        {buddy || "Connect"}
                    </Text>
                </Pressable>
            </Surface>
        </Surface>
    );
};

const styles = StyleSheet.create({
    buddyTitle: {
        color: "white",
        fontWeight: "700",
        fontSize: 24,
        marginVertical: 17,
    },
    icon: {
        marginVertical: 13,
        marginHorizontal: 20,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});

export default YourBuddySurface;
