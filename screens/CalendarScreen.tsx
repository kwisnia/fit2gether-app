import axios, { AxiosResponse } from "axios";
import React from "react";
import { ScrollView } from "react-native";
import FitCalendar from "../components/calendar/Calendar";
import DayTasks from "../components/calendar/DayTasks";
import { Task } from "../types/Task";
const CalendarScreen: React.FunctionComponent = () => {
    const [selectedDay, setSelectedDay] = React.useState(
        new Date().toISOString().split("T")[0]
    );
    const [selectedDayTasks, setSelectedDayTasks] = React.useState<Task[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchSelectedDayTasks = async () => {
            const tasks: AxiosResponse<Task[]> = await axios.get(
                `/tasks?from=${selectedDay}&to=${selectedDay}`
            );
            setSelectedDayTasks(tasks.data);
            setIsLoading(false);
        };
        setIsLoading(true);
        void fetchSelectedDayTasks();
    }, [selectedDay]);

    return (
        <ScrollView>
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
