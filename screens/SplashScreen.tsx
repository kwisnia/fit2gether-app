import { StyleSheet, View } from "react-native";
import React from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";
import Logo from "../assets/f2g_splash.svg";

const SplashScreen = () => {
    const theme = useTheme();
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background,
                },
            ]}
        >
            <View style={styles.logoContainer}>
                <Logo
                    fillPrimary={theme.colors.primary}
                    fillAccent={theme.colors.accent}
                />
            </View>
            <ActivityIndicator size="large" />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
});
