import React from "react";
import { Calendar } from "react-native-calendars";
import { Card, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
        <Card elevation={10} mode="elevated" style={{ margin: 10 }}>
            <Calendar
                markingType={"multi-dot"}
                markedDates={{
                    "2021-12-15": {
                        dots: [vacation, massage, workout],
                        selected: true,
                        selectedColor: theme.colors.accentDark,
                    },
                    "2021-12-16": { dots: [massage, workout] },
                }}
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
                    textDisabledColor: "#ffc1c1",
                    monthTextColor: "white",
                    textSectionTitleColor: "white",
                    "stylesheet.calendar.header": {
                        //@ts-expect-error Types are bad
                        headerContainer: {
                            backgroundColor: theme.colors.primaryDark,
                            flexDirection: "row",
                        },
                        header: {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginLeft: -5,
                            marginRight: -5,
                            alignItems: "center",
                            backgroundColor: theme.colors.primaryDark,
                            paddingLeft: 5,
                            paddingRight: 5,
                        },
                    },
                    "stylesheet.day.basic": {
                        today: {
                            borderRadius: 0,
                            backgroundColor: "white",
                        },
                        selected: {
                            borderRadius: 5,
                            color: "white",
                        },
                    },
                }}
            />
        </Card>
    );
};

export default CalendarScreen;
