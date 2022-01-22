import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { RootStackParamList } from "../types/RootStackParamList";
import { useTheme, Surface } from "react-native-paper";
import LoginSurface from "../components/login/LoginSurface";
import LoginRegisterSelector from "../components/login/LoginRegisterSelector";
import RegisterSurface from "../components/login/RegisterSurface";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SessionInfo } from "../types/SessionInfo";
import { SessionContext } from "../context/SessionContext";

type LoginScreenNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    "Login"
>;

type formType = "login" | "register";

const LoginScreen = ({ navigation }: LoginScreenNavigationProp) => {
    const theme = useTheme();
    const [, setIsWaiting] = React.useState(false);
    const [formType, setFormType] = React.useState<formType>("login");
    const [sessionInfo, , updateSessionInfo] = useContext(SessionContext);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        if (sessionInfo) {
            setIsWaiting(false);
            navigation.navigate("MainApp", {});
        }
    }, [sessionInfo, navigation]);

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
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{ height: 64 }} />
            <ScrollView>
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
