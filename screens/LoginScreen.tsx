import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/RootStackParamList";

type LoginScreenNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    "Login"
>;

const LoginScreen = ({ navigation }: LoginScreenNavigationProp) => {
    const [inputUsername, setInputUsername] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");
    const [isWaiting, setIsWaiting] = React.useState(false);

    const login = async () => {
        setIsWaiting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsWaiting(false);
        navigation.navigate("MainApp", {});
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Username"
                value={inputUsername}
                onChangeText={(text: string) => setInputUsername(text)}
            />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="Password"
                value={inputPassword}
                onChangeText={(text: string) => setInputPassword(text)}
            />
            {!isWaiting ? (
                <Pressable
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.4 : 1,
                        },
                        styles.loginButton,
                    ]}
                    onPress={() => {
                        void login();
                    }}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
            ) : (
                <ActivityIndicator color="#ee4266ff" size={55} />
            )}
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2F2F2F",
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
    header: {
        color: "#ee4266ff",
        fontSize: 28,
        fontWeight: "400",
        textAlign: "center",
        padding: 10,
        marginTop: 10,
    },
    input: {
        backgroundColor: "#fcc89bff",
        padding: 13,
        marginVertical: 4,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
    },
    loginButton: {
        backgroundColor: "#ee4266ff",
        alignSelf: "center",
        padding: 7,
        margin: 10,
        flexDirection: "row",
    },
    loginButtonText: {
        color: "#fcc89bff",
        fontSize: 20,
    },
});
