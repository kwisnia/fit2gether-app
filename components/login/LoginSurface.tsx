import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";

const LoginSurface: React.FunctionComponent<{
    login: (email: string, password: string) => void;
    errorMessage: string;
}> = ({ login, errorMessage }) => {
    const [inputEmail, setInputEmail] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");
    const theme = useTheme();

    const getColorBasedOnFocus = (focused: boolean) => {
        return focused ? theme.colors.primary : theme.colors.primaryLight;
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                left={
                    <TextInput.Icon
                        name="email-outline"
                        color={getColorBasedOnFocus}
                    />
                }
                mode="outlined"
                autoCapitalize="none"
                placeholder="E-mail"
                label="E-mail"
                outlineColor={theme.colors.primaryLight}
                dense
                value={inputEmail}
                onChangeText={(text: string) => setInputEmail(text)}
            />
            <TextInput
                style={styles.input}
                left={
                    <TextInput.Icon name="lock" color={getColorBasedOnFocus} />
                }
                mode="outlined"
                autoCapitalize="none"
                secureTextEntry
                placeholder="Password"
                label="Password"
                outlineColor={theme.colors.primaryLight}
                dense
                value={inputPassword}
                onChangeText={(text: string) => setInputPassword(text)}
            />
            <Button
                mode="contained"
                labelStyle={{ color: "white", fontSize: 18 }}
                color={theme.colors.accent}
                style={styles.button}
                onPress={() => login(inputEmail, inputPassword)}
            >
                Login
            </Button>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
    );
};

export default LoginSurface;

const styles = StyleSheet.create({
    input: {
        marginVertical: 5,
    },
    button: {
        marginTop: 15,
        marginHorizontal: 60,
    },
    errorMessage: {
        color: "red",
        textAlign: "center",
    },
});
