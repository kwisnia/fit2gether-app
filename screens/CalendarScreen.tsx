import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, useTheme } from "react-native-paper";

const CalendarScreen: React.FunctionComponent = () => {
    const vacation = {
        key: "vacation",
        color: "red",
        selectedDotColor: "blue",
    };
    const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
    const workout = { key: "workout", color: "green" };
    const theme = useTheme();
    return (
        <Card>
            <Calendar
                markingType={"multi-dot"}
                markedDates={{
                    "2021-12-15": {
                        dots: [vacation, massage, workout],
                        selected: true,
                        selectedColor: "red",
                    },
                    "2021-12-16": { dots: [massage, workout], disabled: true },
                }}
                theme={{
                    calendarBackground: theme.colors.primaryLight,
                    selectedDayBackgroundColor: theme.colors.accentDark,
                }}
            />
        </Card>
    );
};

export default CalendarScreen;
