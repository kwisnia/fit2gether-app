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
        category: {
            id: 0,
            name: "Exercise",
        },
    },
    {
        id: 1,
        name: "Gym",
        date: "23-11-2021",
        userId: 1,
        category: {
            id: 0,
            name: "Exercise",
        },
    },
    {
        id: 2,
        name: "2L of water",
        date: "23-11-2021",
        userId: 2,
        category: {
            id: 1,
            name: "Nutrition",
        },
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
