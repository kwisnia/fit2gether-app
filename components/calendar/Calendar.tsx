/* eslint-disable no-bitwise */
import React from "react";
import { Calendar } from "react-native-calendars";
import { Surface } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../../context/ThemeContext";
import { MarkedDates } from "../../types/CalendarTypes";

interface CalendarProps {
    selectedDate: string;
    setSelectedDate: (newDate: string) => void;
    fetchDaysWithTasks: (dateStr?: string) => void;
    daysWithTasks: MarkedDates;
}

const hashCode = (item: string) => {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
        const character = item.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

const FitCalendar: React.FunctionComponent<CalendarProps> = ({
    selectedDate,
    setSelectedDate,
    fetchDaysWithTasks,
    daysWithTasks,
}) => {
    const { theme: selectedTheme } = React.useContext(ThemeContext);
    const calendarTheme = React.useMemo(
        () => ({
            calendarBackground: selectedTheme.colors.primaryLight,
            selectedDayBackgroundColor: selectedTheme.colors.accentDark,
            dayTextColor: "white",
            todayTextColor: "white",
            textDisabledColor: "#ffc1c1",
            monthTextColor: "white",
            textSectionTitleColor: "white",
            "stylesheet.calendar.header": {
                headerContainer: {
                    backgroundColor: selectedTheme.colors.primary,
                    flexDirection: "row",
                },
                header: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginLeft: -5,
                    marginRight: -5,
                    alignItems: "center",
                    backgroundColor: selectedTheme.colors.primary,
                    paddingLeft: 5,
                    paddingRight: 5,
                },
            },
            "stylesheet.day.basic": {
                today: {},
                selected: {
                    elevation: 10,
                    borderRadius: 5,
                    backgroundColor: selectedTheme.colors.accentDark,
                    color: "white",
                },
            },
        }),
        [selectedTheme]
    );

    React.useEffect(() => {
        void fetchDaysWithTasks();
    }, [fetchDaysWithTasks]);
    return (
        <Surface style={{ margin: 10 }}>
            <Calendar
                key={hashCode(JSON.stringify(selectedTheme))}
                markingType={"multi-dot"}
                markedDates={{
                    ...daysWithTasks,
                    [selectedDate]: {
                        ...daysWithTasks[selectedDate],
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
                onMonthChange={(month) => {
                    void fetchDaysWithTasks(month.dateString);
                }}
                // @ts-expect-error Types are bad
                theme={calendarTheme}
            />
        </Surface>
    );
};

export default FitCalendar;
