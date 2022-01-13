import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import useSession from "../../hooks/useSession";

const QRCodeSurface = () => {
    const theme = useTheme();
    const [session] = useSession();

    return (
        <Surface
            style={{
                margin: 10,
                backgroundColor: theme.colors.primaryLight,
                display: "flex",
                justifyContent: "center",
                elevation: 12,
            }}
        >
            <View
                style={{
                    ...styles.contentContainer,
                    backgroundColor: theme.colors.primary,
                }}
            >
                <Text style={styles.qrContainerTitle}>
                    Connect to your Buddy
                </Text>
            </View>
            <View style={styles.qrContainer}>
                {session ? (
                    <QRCode
                        value={`fit2gether-${session.inviteCode}`}
                        quietZone={20}
                        size={200}
                    />
                ) : null}
                <Text style={styles.buddyText}>
                    Show your code to your Buddy or scan theirs to connect
                </Text>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    qrContainerTitle: {
        color: "white",
        fontWeight: "500",
        fontSize: 24,
        marginVertical: 17,
    },
    buddyText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        paddingTop: 10,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    qrContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 30,
        marginHorizontal: 30,
    },
});

export default QRCodeSurface;
