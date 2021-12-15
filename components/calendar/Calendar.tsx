import React from "react";
import { Calendar } from "react-native-calendars";
import { Card, Surface, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../../context/ThemeContext";

interface CalendarProps {
    selectedDate: string;
    setSelectedDate: (newDate: string) => void;
}

const FitCalendar: React.FunctionComponent<CalendarProps> = ({
    selectedDate,
    setSelectedDate,
}) => {
    const vacation = {
        key: "vacation",
        color: "red",
        selectedDotColor: "blue",
    };
    const massage = {
        key: "massage",
        color: "blue",
        selectedDotColor: "blue",
    };
    const workout = { key: "workout", color: "green" };
    const theme = useTheme();
    return (
        <Surface style={{ margin: 10 }}>
            <Calendar
                key={theme.dark ? "dark" : "light"}
                markingType={"multi-dot"}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                    },
                }}
                onDayPress={(date) => setSelectedDate(date.dateString)}
                firstDay={1}
                renderArrow={(direction) =>
                    direction === "left" ? (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            color="#FFBCD9"
                            size={30}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="chevron-right"
                            color="#FFBCD9"
                            size={30}
                        />
                    )
                }
                theme={{
                    calendarBackground: theme.colors.primaryLight,
                    selectedDayBackgroundColor: theme.colors.accentDark,
                    dayTextColor: "white",
                    todayTextColor: "white",
                    textDisabledColor: "#ffc1c1",
                    monthTextColor: "white",
                    textSectionTitleColor: "white",
                    "stylesheet.calendar.header": {
                        //@ts-expect-error Types are bad
                        headerContainer: {
                            backgroundColor: theme.colors.primary,
                            flexDirection: "row",
                        },
                        header: {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginLeft: -5,
                            marginRight: -5,
                            alignItems: "center",
                            backgroundColor: theme.colors.primary,
                            paddingLeft: 5,
                            paddingRight: 5,
                        },
                    },
                    "stylesheet.day.basic": {
                        today: {},
                        selected: {
                            elevation: 10,
                            borderRadius: 5,
                            backgroundColor: theme.colors.accentDark,
                            color: "white",
                        },
                    },
                }}
            />
        </Surface>
    );
};

export default FitCalendar;
