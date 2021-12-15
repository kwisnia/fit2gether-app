import React from "react";
import { View, Text, ScrollView } from "react-native";
import Task from "../components/tasks/Task";
import { Task as TaskType } from "../types/Task";

const TASKS: TaskType[] = [
    {
        id: 0,
        name: "Yoga",
        date: "23-11-2021",
        userId: 2,
        categoryId: 0,
    },
    {
        id: 1,
        name: "Gym",
        date: "23-11-2021",
        userId: 1,
        categoryId: 0,
    },
    {
        id: 2,
        name: "2L of water",
        date: "23-11-2021",
        userId: 2,
        categoryId: 1,
    },
];

const TasksScreen = () => {
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            {TASKS.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </ScrollView>
    );
};

export default TasksScreen;
