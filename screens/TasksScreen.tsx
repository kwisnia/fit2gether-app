import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { RefreshControl, ScrollView } from "react-native";
import NewTask from "../components/tasks/NewTask";
import Task from "../components/tasks/Task";
import { Task as TaskType } from "../types/Task";
import { Category as CategoryType } from "../types/Category";
import { SessionContext } from "../context/SessionContext";

const TasksScreen: React.FunctionComponent = () => {
    //TODO: those should be fetched
    /* those are fetched now? */
    const [tasks, setTasks] = React.useState<TaskType[] | null>(null);
    const [categories, setCategories] = React.useState<CategoryType[]>([
        { label: "Training", value: 1 },
    ]);
    const [sessionInfo] = useContext(SessionContext);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        const fetchedTasks: AxiosResponse<TaskType[]> = await axios.get(
            "/tasks?status=todo"
        );
        setTasks(fetchedTasks.data);
    }, []);

    React.useEffect(() => {
        const fetchPairTasks = async () => {
            const fetchedCategories: AxiosResponse<CategoryType[]> =
                await axios.get("/getAllCategories");
            setCategories(fetchedCategories.data);
            const fetchedTasks: AxiosResponse<TaskType[]> = await axios.get(
                "/tasks?status=todo"
            );
            setTasks(fetchedTasks.data);
        };
        void fetchPairTasks();
    }, []);

    //TODO: make it actually fetch
    // fetchy fetchy
    const requestListRefresh = async () => {
        const fetchedTasks: AxiosResponse<TaskType[]> = await axios.get(
            "/tasks?status=todo"
        );
        setTasks(fetchedTasks.data);
    };

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {tasks?.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    categories={categories}
                    userId={sessionInfo?.id}
                    refresh={requestListRefresh}
                />
            ))}
            <NewTask refresh={requestListRefresh} categories={categories} />
        </ScrollView>
    );
};

export default TasksScreen;
