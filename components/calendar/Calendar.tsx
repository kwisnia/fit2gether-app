/* eslint-disable no-bitwise */
import React from "react";
import { Calendar } from "react-native-calendars";
import { Card, Surface, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../../context/ThemeContext";
import dayjs from "dayjs";
import axios, { AxiosResponse } from "axios";

interface CalendarProps {
    selectedDate: string;
    setSelectedDate: (newDate: string) => void;
}

interface DaysWithTasks {
    user: string[];
    buddy: string[];
}

interface Dot {
    key: string;
    color: string;
}

interface MarkedDates {
    [date: string]: {
        selected?: boolean;
        dots?: Dot[];
        selectedColor?: string;
    };
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
}) => {
    const theme = useTheme();
    const { theme: selectedTheme } = React.useContext(ThemeContext);
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
    const [daysWithTasks, setDaysWithTasks] = React.useState<MarkedDates>({});
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
