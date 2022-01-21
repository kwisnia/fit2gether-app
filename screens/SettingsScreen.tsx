import { useIsFocused } from "@react-navigation/native";
import axios, { AxiosError } from "axios";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
    Surface,
    Avatar,
    useTheme,
    TextInput,
    ActivityIndicator,
} from "react-native-paper";
import { SessionContext } from "../context/SessionContext";

const SettingsScreen = () => {
    const theme = useTheme();
    const [sessionInfo, refreshSessionInfo, updateSessionInfo] =
        useContext(SessionContext);
    const isFocused = useIsFocused();
    const [username, setUsername] = React.useState(sessionInfo?.username || "");
    const [email, setEmail] = React.useState(sessionInfo?.email || "");
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [pending, setPending] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const getColorBasedOnFocus = (focused: boolean) => {
        return focused ? theme.colors.primary : theme.colors.primaryDark;
    };

    React.useEffect(() => {
        if (isFocused) {
            refreshSessionInfo();
        }
    }, [isFocused, refreshSessionInfo]);

    React.useEffect(() => {
        setUsername(sessionInfo?.username || "");
        setEmail(sessionInfo?.email || "");
    }, [sessionInfo]);

    const updateUserData = async () => {
        setPending(true);
        const updatedData: {
            username?: string;
            email?: string;
        } = {};
        if (username && email) {
            try {
                await axios.post("/editProfile", {
                    email,
                    name: username,
                });
                updatedData.username = username;
                updatedData.email = email;
                const newToken = await axios.post<{
                    accessToken: string;
                    refreshToken: string;
                }>("/refresh", {
                    refresh: sessionInfo?.token.refreshToken,
                });
                if (sessionInfo) {
                    updateSessionInfo({
                        ...sessionInfo,
                        ...updatedData,
                        token: newToken.data,
                    });
                }
            } catch (err) {
                const { response } = err as AxiosError<{
                    message: string;
                }>;
                if (response) {
                    setErrorMessage(response.data.message);
                }
            }
        }
        if (
            oldPassword &&
            newPassword &&
            confirmPassword &&
            newPassword === confirmPassword
        ) {
            try {
                await axios.post("/changePassword", {
                    oldPassword,
                    newPassword,
                    newPassword2: confirmPassword,
                });
            } catch (err) {
                const { response } = err as AxiosError<{
                    message: string;
                }>;
                if (response) {
                    setErrorMessage(response.data.message);
                }
            }
        }
        setPending(false);
    };

    return (
        <View>
            <Surface style={styles.container}>
                <Text style={styles.header}>Edit profile</Text>
            </Surface>
            <Surface
                style={[
                    styles.bottomContainer,
                    {
                        backgroundColor: theme.colors.primaryLight,
                    },
                ]}
            >
                <View style={styles.row}>
                    <Avatar.Image
                        size={100}
                        source={{
                            uri:
                                Math.random() > 0.5
                                    ? "https://i.redd.it/rbbzu2ah8pk61.jpg"
                                    : "https://static.wikia.nocookie.net/7f013cd3-16cd-4b47-a30e-94ef61d8391d",
                        }}
                    ></Avatar.Image>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.primaryLight },
                            ]}
                            right={
                                <TextInput.Icon
                                    name="pencil"
                                    color={getColorBasedOnFocus}
                                />
                            }
                            mode="outlined"
                            autoCapitalize="none"
                            placeholder="Username"
                            label="Username"
                            outlineColor={theme.colors.primaryDark}
                            dense
                            value={username}
                            onChangeText={(text: string) => setUsername(text)}
                        />
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.primaryLight },
                            ]}
                            right={
                                <TextInput.Icon
                                    name="pencil"
                                    color={getColorBasedOnFocus}
                                />
                            }
                            mode="outlined"
                            autoCapitalize="none"
                            placeholder="E-mail"
                            label="E-mail"
                            outlineColor={theme.colors.primaryDark}
                            dense
                            value={email}
                            onChangeText={(text: string) => setEmail(text)}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.primaryLight },
                            ]}
                            secureTextEntry
                            mode="outlined"
                            autoCapitalize="none"
                            placeholder="Old password"
                            label="Old password"
                            outlineColor={theme.colors.primaryDark}
                            dense
                            value={oldPassword}
                            onChangeText={(text: string) =>
                                setOldPassword(text)
                            }
                        />
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.primaryLight },
                            ]}
                            secureTextEntry
                            mode="outlined"
                            autoCapitalize="none"
                            placeholder="New password"
                            label="New password"
                            outlineColor={theme.colors.primaryDark}
                            dense
                            value={newPassword}
                            onChangeText={(text: string) =>
                                setNewPassword(text)
                            }
                        />
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.primaryLight },
                            ]}
                            secureTextEntry
                            mode="outlined"
                            autoCapitalize="none"
                            placeholder="Confirm new password"
                            label="Confirm new password"
                            outlineColor={theme.colors.primaryDark}
                            dense
                            value={confirmPassword}
                            onChangeText={(text: string) =>
                                setConfirmPassword(text)
                            }
                        />
                    </View>
                    {pending ? (
                        <ActivityIndicator />
                    ) : (
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    width: "33%",
                                    opacity: pressed ? 0.5 : 1,
                                },
                            ]}
                            onPress={updateUserData}
                        >
                            <Surface
                                style={[
                                    styles.button,
                                    { backgroundColor: theme.colors.accent },
                                ]}
                            >
                                <Text style={styles.text}>SAVE CHANGES</Text>
                            </Surface>
                        </Pressable>
                    )}
                </View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </Surface>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 1,
        marginHorizontal: 5,
        marginTop: 5,
    },
    bottomContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 5,
    },
    header: {
        color: "white",
        fontWeight: "500",
        fontSize: 22,
        margin: 15,
    },
    input: {
        marginVertical: 5,
        minWidth: 100,
    },
    row: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    inputContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    text: {
        color: "white",
        textAlign: "center",
        fontWeight: "500",
    },
    errorMessage: {
        color: "red",
        textAlign: "center",
    },
});
