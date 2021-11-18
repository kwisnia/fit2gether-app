import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Button } from "react-native-paper";

interface IProps {
    formType: "login" | "register";
    setFormType: (value: "login" | "register") => void;
}

const LoginRegisterSelector: React.FunctionComponent<IProps> = ({
    formType,
    setFormType,
}) => {
    const theme = useTheme();

    return (
        <View style={styles.buttonRow}>
            <Button
                style={styles.button}
                mode="contained"
                labelStyle={{ color: "white", fontSize: 18 }}
                color={
                    formType === "login"
                        ? theme.colors.primaryDark
                        : theme.colors.primary
                }
                onPress={() => setFormType("login")}
            >
                Login
            </Button>
            <Button
                style={styles.button}
                mode="contained"
                labelStyle={{ color: "white", fontSize: 18 }}
                color={
                    formType === "register"
                        ? theme.colors.primaryDark
                        : theme.colors.primary
                }
                onPress={() => setFormType("register")}
            >
                Register
            </Button>
        </View>
    );
};

export default LoginRegisterSelector;

const styles = StyleSheet.create({
    button: {
        width: "50%",
    },
    buttonRow: {
        marginHorizontal: 10,
        flexDirection: "row",
    },
});
