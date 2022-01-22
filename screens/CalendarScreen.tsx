import { useIsFocused } from "@react-navigation/native";
import axios, { AxiosResponse } from "axios";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import FitCalendar from "../components/calendar/Calendar";
import DayTasks from "../components/calendar/DayTasks";
import { TabContext } from "../context/TabContext";
import { Task } from "../types/Task";
import dayjs from "dayjs";
import { DaysWithTasks, MarkedDates } from "../types/CalendarTypes";

const CalendarScreen: React.FunctionComponent = () => {
    const [selectedDay, setSelectedDay] = React.useState(
        new Date().toISOString().split("T")[0]
    );
    const [selectedDayTasks, setSelectedDayTasks] = React.useState<Task[]>([]);
    const isFocused = useIsFocused();
    const theme = useTheme();
    const [isLoading, setIsLoading] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const userDot = React.useMemo(
        () => ({
            key: "user",
            color: theme.colors.surface,
        }),
        [theme]
    );
    const buddyDot = React.useMemo(
        () => ({
            key: "buddy",
            color: theme.colors.accent,
        }),
        [theme]
    );
    const [daysWithTasks, setDaysWithTasks] = React.useState<MarkedDates>({});
    const { setTab } = React.useContext(TabContext);

    const fetchSelectedDayTasks = React.useCallback(async () => {
        const tasks: AxiosResponse<Task[]> = await axios.get(
            `/tasks?from=${selectedDay}&to=${selectedDay}`
        );
        setSelectedDayTasks(tasks.data);
        setIsLoading(false);
    }, [selectedDay]);

    const fetchDaysWithTasks = React.useCallback(
        async (dateStr?: string) => {
            const date = dayjs(dateStr);
            const dateFrom = date.date(1);
            const dateTo = date.date(date.daysInMonth()).hour(23);
            try {
                const days: AxiosResponse<DaysWithTasks> = await axios.get(
                    `/getDaysWithTasks?from=${
                        dateFrom.toISOString().split("T")[0]
                    }&to=${dateTo.toISOString().split("T")[0]}`
                );
                const markedDays: MarkedDates = {};
                days.data.user.forEach((date) => {
                    markedDays[date] = {
                        dots: [userDot],
                    };
                });
                days.data.buddy.forEach((date) => {
                    if (markedDays[date]) {
                        markedDays[date].dots?.push(buddyDot);
                    } else {
                        markedDays[date] = {
                            dots: [buddyDot],
                        };
                    }
                });
                setDaysWithTasks(markedDays);
            } catch (err) {
                console.log(err);
            }
        },
        [buddyDot, userDot]
    );

    React.useEffect(() => {
        if (isFocused) {
            setIsLoading(true);
            void fetchSelectedDayTasks();
            setTab("Calendar");
        }
    }, [selectedDay, isFocused, fetchSelectedDayTasks, setTab]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchDaysWithTasks();
        await fetchSelectedDayTasks();
        setRefreshing(false);
    }, [fetchSelectedDayTasks, fetchDaysWithTasks]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <FitCalendar
                selectedDate={selectedDay}
                setSelectedDate={setSelectedDay}
                fetchDaysWithTasks={fetchDaysWithTasks}
                daysWithTasks={daysWithTasks}
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
