import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/RootStackParamList";
import { useTheme, Surface } from "react-native-paper";
import LoginSurface from "../components/login/LoginSurface";
import LoginRegisterSelector from "../components/login/LoginRegisterSelector";
import RegisterSurface from "../components/login/RegisterSurface";
import * as SecureStore from "expo-secure-store";
import axios, { AxiosResponse } from "axios";
import { SessionInfo } from "../types/SessionInfo";

type LoginScreenNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    "Login"
>;

type formType = "login" | "register";

const LoginScreen = ({ navigation }: LoginScreenNavigationProp) => {
    const theme = useTheme();
    const [, setIsWaiting] = React.useState(false);
    const [formType, setFormType] = React.useState<formType>("login");

    const login = async (email: string, password: string) => {
        try {
            setIsWaiting(true);
            const res: AxiosResponse<SessionInfo> = await axios.post("/login", {
                email,
                password,
            });
            await SecureStore.setItemAsync("session", JSON.stringify(res.data));
            axios.defaults.headers.common.Authorization = `Bearer ${res.data.token.accessToken}`;
            setIsWaiting(false);
            navigation.navigate("MainApp", {});
        } catch (err) {
            console.log(err);
        }
    };
    const register = async (
        username: string,
        email: string,
        password: string,
        repeatInputPassword: string
    ) => {
        try {
            setIsWaiting(true);
            if (password === repeatInputPassword) {
                const res: AxiosResponse<SessionInfo> = await axios.post(
                    "/register",
                    {
                        email,
                        username,
                        password,
                        password2: repeatInputPassword,
                    }
                );
                await SecureStore.setItemAsync(
                    "session",
                    JSON.stringify(res.data)
                );
                axios.defaults.headers.common.Authorization = `Bearer ${res.data.token.accessToken}`;
                setIsWaiting(false);
                navigation.navigate("MainApp", {});
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        source={require("../assets/f2g_logo.png")}
                    />
                </View>
                <Text style={styles.title}>Fit2Gether</Text>
                <LoginRegisterSelector
                    formType={formType}
                    setFormType={setFormType}
                />
                <Surface
                    style={[
                        { backgroundColor: theme.colors.background },
                        styles.surface,
                    ]}
                >
                    {formType === "login" ? (
                        <LoginSurface login={login} />
                    ) : (
                        <RegisterSurface register={register} />
                    )}
                </Surface>
            </SafeAreaView>
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
    logoContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
    logo: {
        marginHorizontal: 50,
    },
    title: {
        fontSize: 45,
        marginBottom: 30,
        fontWeight: "bold",
        alignSelf: "center",
    },
    surface: {
        marginHorizontal: 10,
        paddingHorizontal: 50,
        paddingVertical: 30,
    },
});
