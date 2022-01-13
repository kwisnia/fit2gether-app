import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme, Surface } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Camera } from "expo-camera";

const YourBuddySurface: React.FunctionComponent<{
    buddy: string | null;
    setScanning: (_: boolean) => void;
}> = ({ buddy, setScanning }) => {
    const theme = useTheme();

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
                    <MaterialCommunityIcons
                        name="account-outline"
                        color={theme.colors.accentLight}
                        size={36}
                        style={styles.icon}
                    />
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
    },
});

export default YourBuddySurface;
