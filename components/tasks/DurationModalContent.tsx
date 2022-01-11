import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Surface, useTheme, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DurationModalContent: React.FunctionComponent<{
    duration: number;
    setDuration: (value: number) => void;
    dismiss: () => void;
}> = ({ duration, setDuration, dismiss }) => {
    const theme = useTheme();
    return (
        <Surface style={styles.container}>
            <View>
                <Text style={styles.text}>
                    Enter task duration (in minutes)
                </Text>
            </View>
            <View style={styles.inputRow}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: theme.colors.primaryDark,
                            minWidth: 150,
                        },
                    ]}
                    left={
                        <TextInput.Icon
                            name="timer-outline"
                            color={theme.colors.primary}
                        />
                    }
                    mode="outlined"
                    autoCapitalize="none"
                    placeholder="Duration"
                    label="Duration"
                    outlineColor={theme.colors.primary}
                    dense
                    value={duration.toString()}
                    onChangeText={(text: string) => setDuration(Number(text))}
                />
            </View>
            <Pressable onPress={dismiss}>
                <MaterialCommunityIcons
                    name="checkbox-marked-circle-outline"
                    color={theme.colors.primaryLight}
                    size={40}
                />
            </Pressable>
        </Surface>
    );
};

export default DurationModalContent;

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        marginHorizontal: 50,
        padding: 15,
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
    },
    input: {
        marginVertical: 5,
        minWidth: 100,
    },
    inputRow: {
        height: 60,
    },
});
