/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import {
    useTheme,
    Surface,
    ActivityIndicator,
    Avatar,
} from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Task } from "../../types/Task";
import { AVATARS } from "../settings/avatars";
import { SessionContext } from "../../context/SessionContext";

interface DayTasksProps {
    selectedDate: string;
    selectedDayTasks: Task[];
    isLoading: boolean;
}

const DayTasks: React.FunctionComponent<DayTasksProps> = ({
    selectedDate,
    selectedDayTasks,
    isLoading,
}) => {
    const theme = useTheme();
    const [sessionInfo] = React.useContext(SessionContext);

    return (
        <View>
            <Surface
                style={{
                    margin: 10,
                    backgroundColor: theme.colors.primaryLight,
                }}
            >
                <View
                    style={{
                        ...styles.contentContainer,
                        backgroundColor: theme.colors.primary,
                    }}
                >
                    <MaterialCommunityIcons
                        name="calendar-blank"
                        color="white"
                        size={36}
                        style={styles.icon}
                    />

                    <Text style={styles.taskTitle}>{selectedDate}</Text>
                </View>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    selectedDayTasks.map((task) => (
                        <Surface
                            key={task.id}
                            style={[
                                styles.contentContainer,
                                {
                                    justifyContent: "space-between",
                                    backgroundColor: theme.colors.primary,
                                    margin: 10,
                                    borderRadius: 2,
                                },
                            ]}
                        >
                            <View style={styles.contentContainer}>
                                <Avatar.Image
                                    style={styles.icon}
                                    size={40}
                                    source={
                                        AVATARS[
                                            task.userId === sessionInfo?.id
                                                ? sessionInfo?.profilePicture ||
                                                  1
                                                : sessionInfo?.buddyProfilePicture ||
                                                  1
                                        ]
                                    }
                                ></Avatar.Image>
                                <Text style={styles.taskTitle}>
                                    {task.name}
                                </Text>
                            </View>

                            <Text style={styles.category}>
                                {task.category.name}
                            </Text>
                        </Surface>
                    ))
                )}
            </Surface>
        </View>
    );
};

const styles = StyleSheet.create({
    taskTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
        marginVertical: 17,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    category: {
        marginVertical: 22,
        marginRight: 20,
        color: "#ffc1c1",
        textTransform: "uppercase",
    },
    icon: {
        marginVertical: 13,
        marginHorizontal: 20,
    },
});
export default DayTasks;
