import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/RootStackParamList";
import { useTheme, Surface } from "react-native-paper";
import LoginSurface from "../components/login/LoginSurface";
import LoginRegisterSelector from "../components/login/LoginRegisterSelector";
import RegisterSurface from "../components/login/RegisterSurface";

type LoginScreenNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    "Login"
>;

type formType = "login" | "register";

const LoginScreen = ({ navigation }: LoginScreenNavigationProp) => {
    const theme = useTheme();
    const [, setIsWaiting] = React.useState(false);
    const [formType, setFormType] = React.useState<formType>("login");

    const login = async () => {
        setIsWaiting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsWaiting(false);
        navigation.navigate("MainApp", {});
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
                        <RegisterSurface />
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
