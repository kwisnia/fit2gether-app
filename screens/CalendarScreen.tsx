import React from "react";
import { ScrollView } from "react-native";
import FitCalendar from "../components/calendar/Calendar";
import DayTasks from "../components/calendar/DayTasks";
import { Task } from "../types/Task";
const CalendarScreen: React.FunctionComponent = () => {
    const [selectedDay, setSelectedDay] = React.useState(
        new Date().toISOString().split("T")[0]
    );
    // Placeholder
    const [selectedDayTasks] = React.useState<Task[]>([
        {
            id: 1,
            name: "Yoga",
            userId: 4,
            date: "2021-12-15",
            category: {
                id: 1,
                name: "Exercise",
            },
        },
        {
            id: 2,
            name: "Yoga2",
            userId: 5,
            date: "2021-12-15",
            category: {
                id: 1,
                name: "Exercise",
            },
        },
    ]);
    return (
        <ScrollView>
            <FitCalendar
                selectedDate={selectedDay}
                setSelectedDate={setSelectedDay}
            />
            <DayTasks
                selectedDate={selectedDay}
                selectedDayTasks={selectedDayTasks}
            />
        </ScrollView>
    );
};

export default CalendarScreen;
