import React from "react";
import { StyleSheet, Text } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TaskCompleteDetails } from "../../types/TaskCompleteDetails";

const CompletedModalContent: React.FunctionComponent<{
    taskCompleteDetails: TaskCompleteDetails;
}> = ({ taskCompleteDetails }) => {
    const theme = useTheme();
    return (
        <Surface style={styles.container}>
            <MaterialCommunityIcons
                name="checkbox-marked-circle-outline"
                color={theme.colors.accent}
                size={120}
            />
            <Text style={styles.text}>Task completed!</Text>
            <Text
                style={styles.text}
            >{`You and your buddy receive ${taskCompleteDetails.experience} XP`}</Text>
            {taskCompleteDetails.dailyBonus ? (
                <Text>
                    Wow! You and your buddy completed a task today! Here&apos;s
                    bonus XP for you.
                </Text>
            ) : null}
        </Surface>
    );
};

export default CompletedModalContent;

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
});
