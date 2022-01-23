import React, { useContext } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useTheme, Surface } from "react-native-paper";
import LoginSurface from "../components/login/LoginSurface";
import LoginRegisterSelector from "../components/login/LoginRegisterSelector";
import RegisterSurface from "../components/login/RegisterSurface";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SessionInfo } from "../types/SessionInfo";
import { SessionContext } from "../context/SessionContext";
import Logo from "../assets/f2g_splash.svg";
import { ThemeContext } from "../context/ThemeContext";

type formType = "login" | "register";

const LoginScreen = () => {
    const theme = useTheme();
    const { isThemeDark } = React.useContext(ThemeContext);
    const [, setIsWaiting] = React.useState(false);
    const [formType, setFormType] = React.useState<formType>("login");
    const [sessionInfo, , updateSessionInfo] = useContext(SessionContext);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        if (sessionInfo) {
            setIsWaiting(false);
        }
    }, [sessionInfo]);

    React.useEffect(() => {
        setErrorMessage("");
    }, [formType]);

    const login = async (email: string, password: string) => {
        try {
            setIsWaiting(true);
            setErrorMessage("");
            const res: AxiosResponse<SessionInfo> = await axios.post("/login", {
                email,
                password,
            });
            updateSessionInfo({
                ...sessionInfo,
                ...res.data,
            });
        } catch (err) {
            const { response } = err as AxiosError<{ message: string }>;
            if (response?.status === 404) {
                setErrorMessage(response.data.message);
            }
        }
    };
    const register = async (
        username: string,
        email: string,
        password: string,
        repeatInputPassword: string,
        safety: number
    ) => {
        try {
            setIsWaiting(true);
            setErrorMessage("");
            if (password === repeatInputPassword && safety >= 1) {
                const res: AxiosResponse<SessionInfo> = await axios.post(
                    "/register",
                    {
                        email,
                        username,
                        password,
                        password2: repeatInputPassword,
                    }
                );
                updateSessionInfo({ ...res.data, selectedTheme: "Default" });
            }
        } catch (err) {
            const { response } = err as AxiosError<{ message: string }>;
            if (response?.status === 400) {
                setErrorMessage(response.data.message);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background,
                },
            ]}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{ height: 64 }} />
            <ScrollView>
                <View style={styles.logoContainer}>
                    <Logo
                        fillPrimary={theme.colors.primary}
                        fillAccent={theme.colors.accent}
                        height={200}
                        width={210}
                    />
                </View>
                <Text
                    style={[
                        styles.title,
                        {
                            color: isThemeDark ? "white" : "black",
                        },
                    ]}
                >
                    Fit2Gether
                </Text>
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
                        <LoginSurface
                            login={login}
                            errorMessage={errorMessage}
                        />
                    ) : (
                        <RegisterSurface
                            register={register}
                            errorMessage={errorMessage}
                        />
                    )}
                </Surface>
            </ScrollView>
        </KeyboardAvoidingView>
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
