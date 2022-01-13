import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Surface, Avatar, useTheme, TextInput } from "react-native-paper";
import useSession from "../hooks/useSession";

const SettingsScreen = () => {
    const theme = useTheme();
    const [session, refreshSessionInfo] = useSession();
    const isFocused = useIsFocused();
    const [username, setUsername] = React.useState(session?.username);
    const [email, setEmail] = React.useState(session?.email);
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const getColorBasedOnFocus = (focused: boolean) => {
        return focused ? theme.colors.primary : theme.colors.primaryDark;
    };

    React.useEffect(() => {
        if (isFocused) {
            refreshSessionInfo();
        }
    }, [isFocused, refreshSessionInfo]);

    React.useEffect(() => {
        setUsername(session?.username);
        setEmail(session?.email);
    }, [session]);

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
                    <Pressable
                        style={({ pressed }) => [
                            {
                                width: "33%",
                                opacity: pressed ? 0.5 : 1,
                            },
                        ]}
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
                </View>
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
});
