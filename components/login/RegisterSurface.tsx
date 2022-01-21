import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";
import zxcvbn from "zxcvbn";

interface RegisterProps {
    register(
        username: string,
        email: string,
        password: string,
        repeatInputPassword: string,
        safety: number
    ): void;
    errorMessage: string;
}

const RegisterSurface: React.FunctionComponent<RegisterProps> = ({
    register,
    errorMessage,
}) => {
    const [inputUsername, setInputUsername] = React.useState("");
    const [inputEmail, setInputEmail] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");
    const [repeatInputPassword, setRepeatInputPassword] = React.useState("");
    const [safety, setSafety] = React.useState(0);

    const theme = useTheme();

    const getColorBasedOnFocus = (focused: boolean) => {
        return focused ? theme.colors.primary : theme.colors.primaryLight;
    };

    React.useEffect(() => {
        setSafety(zxcvbn(inputPassword).score as number); //eslint-disable-line
    }, [inputPassword]);

    return (
        <View>
            <TextInput
                style={styles.input}
                left={
                    <TextInput.Icon
                        name="account-outline"
                        color={getColorBasedOnFocus}
                    />
                }
                mode="outlined"
                autoCapitalize="none"
                placeholder="Username"
                label="Username"
                outlineColor={theme.colors.primaryLight}
                dense
                value={inputUsername}
                onChangeText={(text: string) => setInputUsername(text)}
            />
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
            {inputPassword.length === 0 || safety > 1 ? null : (
                <Text>The password is too weak.</Text>
            )}
            <TextInput
                style={styles.input}
                left={
                    <TextInput.Icon name="lock" color={getColorBasedOnFocus} />
                }
                mode="outlined"
                autoCapitalize="none"
                secureTextEntry
                placeholder="Repeat password"
                label="Repeat password"
                outlineColor={theme.colors.primaryLight}
                dense
                value={repeatInputPassword}
                onChangeText={(text: string) => setRepeatInputPassword(text)}
            />
            {repeatInputPassword.length ||
            inputPassword === repeatInputPassword ? null : (
                    <Text>Passwords are different.</Text>
                )}
            <Button
                mode="contained"
                labelStyle={{ color: "white", fontSize: 18 }}
                color={theme.colors.accent}
                style={styles.button}
                onPress={() =>
                    register(
                        inputUsername,
                        inputEmail,
                        inputPassword,
                        repeatInputPassword,
                        safety
                    )
                }
            >
                Register
            </Button>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
    );
};

export default RegisterSurface;

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
