import React from "react";
import { View, Text, ScrollView } from "react-native";
import NewTask from "../components/tasks/NewTask";
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

const CATEGORIES = [
    {
        label: "Training",
        value: "Training",
    },
    {
        label: "Nutrition",
        value: "Nutrition",
    },
];

const TasksScreen = () => {
    //TODO: those should be fetched
    const [tasks, setTasks] = React.useState(TASKS);
    const categories = CATEGORIES;

    //TODO: make it actually fetch
    const requestListRefresh = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            {tasks.map((task) => (
                <Task key={task.id} task={task} categories={categories} />
            ))}
            <NewTask refresh={requestListRefresh} categories={categories} />
        </ScrollView>
    );
};

export default TasksScreen;
