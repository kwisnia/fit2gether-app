import { useIsFocused } from "@react-navigation/native";
import axios, { AxiosResponse } from "axios";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import FitCalendar from "../components/calendar/Calendar";
import DayTasks from "../components/calendar/DayTasks";
import { TabContext } from "../context/TabContext";
import { Task } from "../types/Task";
const CalendarScreen: React.FunctionComponent = () => {
    const [selectedDay, setSelectedDay] = React.useState(
        new Date().toISOString().split("T")[0]
    );
    const [selectedDayTasks, setSelectedDayTasks] = React.useState<Task[]>([]);
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const { setTab } = React.useContext(TabContext);

    const fetchSelectedDayTasks = React.useCallback(async () => {
        const tasks: AxiosResponse<Task[]> = await axios.get(
            `/tasks?from=${selectedDay}&to=${selectedDay}`
        );
        setSelectedDayTasks(tasks.data);
        setIsLoading(false);
    }, [selectedDay]);

    React.useEffect(() => {
        if (isFocused) {
            setIsLoading(true);
            void fetchSelectedDayTasks();
            setTab("Calendar");
        }
    }, [selectedDay, isFocused, fetchSelectedDayTasks, setTab]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchSelectedDayTasks();
        setRefreshing(false);
    }, [fetchSelectedDayTasks]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <FitCalendar
                selectedDate={selectedDay}
                setSelectedDate={setSelectedDay}
            />
            <DayTasks
                selectedDate={selectedDay}
                selectedDayTasks={selectedDayTasks}
                isLoading={isLoading}
            />
        </ScrollView>
    );
};

export default CalendarScreen;
