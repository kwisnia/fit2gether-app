import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";

const RegisterSurface = () => {
    const [inputUsername, setInputUsername] = React.useState("");
    const [inputEmail, setInputEmail] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");
    const [repeatInputPassword, setRepeatInputPassword] = React.useState("");
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
            <Button
                mode="contained"
                labelStyle={{ color: "white", fontSize: 18 }}
                color={theme.colors.accent}
                style={styles.button}
            >
                Register
            </Button>
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
});
