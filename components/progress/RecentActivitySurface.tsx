import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Surface, Avatar, useTheme } from "react-native-paper";
import { RecentActivity } from "../../types/PairInfo";
import dayjs from "dayjs";

const Task: React.FunctionComponent<{ activity: RecentActivity }> = ({
    activity,
}) => {
    return (
        <Surface style={styles.taskContainer}>
            <Avatar.Image
                size={40}
                source={{
                    uri:
                        Math.random() > 0.5
                            ? "https://i.redd.it/rbbzu2ah8pk61.jpg"
                            : "https://static.wikia.nocookie.net/7f013cd3-16cd-4b47-a30e-94ef61d8391d",
                }}
            ></Avatar.Image>
            <View style={styles.taskTextContainer}>
                <Text style={styles.taskText}>{activity.name}</Text>
                <Text style={styles.taskDate}>
                    {dayjs(activity.completionTime).format("DD/MM/YYYY")}
                </Text>
            </View>
        </Surface>
    );
};

const RecentActivitySurface: React.FunctionComponent<{
    activities: RecentActivity[];
}> = ({ activities }) => {
    const theme = useTheme();

    return (
        <View>
            <Surface style={styles.container}>
                <Text style={styles.header}>Recent activity</Text>
            </Surface>
            <Surface
                style={[
                    styles.bottomContainer,
                    {
                        backgroundColor: theme.colors.primaryLight,
                    },
                ]}
            >
                {activities.map((activity) => (
                    <Task
                        key={activity.name + activity.completionTime}
                        activity={activity}
                    />
                ))}
            </Surface>
        </View>
    );
};

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
    taskContainer: {
        marginVertical: 3,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    taskTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 5,
        flex: 1,
    },
    taskText: {
        color: "white",
        fontWeight: "500",
        fontSize: 16,
        textAlign: "left",
    },
    taskDate: {
        color: "white",
        fontWeight: "500",
        fontSize: 16,
        textAlign: "right",
    },
});

export default RecentActivitySurface;
