import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
    useTheme,
    Surface,
    TextInput,
    Portal,
    Modal,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Task as TaskType } from "../../types/Task";
import { Category as CategoryType } from "../../types/Category";
import RNPickerSelect from "react-native-picker-select";
import { DatePickerModal } from "react-native-paper-dates";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import CompletedModalContent from "./CompletedModalContent";
import DurationModalContent from "./DurationModalContent";
dayjs.extend(customParseFormat);

const Task: React.FunctionComponent<{
    task: TaskType;
    categories: CategoryType[];
}> = ({ task, categories }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [completedModalVisible, setCompletedModalVisible] =
        React.useState(false);
    const [durationModalVisible, setDurationModalVisible] =
        React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [date, setDate] = React.useState(dayjs(task.date, "DD-MM-YYYY"));
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [title, setTitle] = React.useState(task.name);
    const [category, setCategory] = React.useState(
        categories[task.category.id].value
    );
    const theme = useTheme();

    const getColorBasedOnFocus = (focused: boolean) => {
        return focused ? theme.colors.primary : theme.colors.primaryDark;
    };

    return (
        <View>
            <Portal>
                <Modal
                    visible={completedModalVisible}
                    onDismiss={() => setCompletedModalVisible(false)}
                >
                    <CompletedModalContent exp={40} />
                </Modal>
                <Modal visible={durationModalVisible} dismissable={false}>
                    <DurationModalContent
                        duration={duration}
                        setDuration={setDuration}
                        dismiss={() => {
                            setDurationModalVisible(false);
                            setCompletedModalVisible(true);
                        }}
                    />
                </Modal>
            </Portal>
            <Pressable onPress={() => setIsFocused(!isFocused)}>
                <Surface
                    style={[
                        styles.container,
                        {
                            backgroundColor: isFocused
                                ? theme.colors.primaryDark
                                : theme.colors.primary,
                        },
                    ]}
                >
                    <MaterialCommunityIcons
                        name="account-outline"
                        color={task.userId === 2 ? "#C4D149" : "#EDD3CE"}
                        size={40}
                    />
                    <Text style={styles.taskTitle}>{task.name}</Text>
                </Surface>
            </Pressable>
            {isFocused ? (
                <Surface
                    style={[
                        styles.container,
                        {
                            marginTop: 0,
                            backgroundColor: theme.colors.primaryLight,
                            flex: 1,
                            flexDirection: "column",
                        },
                    ]}
                >
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.primaryLight },
                            ]}
                            left={
                                <TextInput.Icon
                                    name="spellcheck"
                                    color={getColorBasedOnFocus}
                                />
                            }
                            mode="outlined"
                            autoCapitalize="none"
                            placeholder="Title"
                            label="Title"
                            outlineColor={theme.colors.primaryDark}
                            dense
                            value={title}
                            onChangeText={(text: string) => setTitle(text)}
                        />
                        <RNPickerSelect
                            onValueChange={(value: string) =>
                                setCategory(value)
                            }
                            placeholder={{}}
                            items={categories}
                        >
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor:
                                            theme.colors.primaryLight,
                                    },
                                ]}
                                left={
                                    <TextInput.Icon
                                        name="format-list-bulleted"
                                        color={getColorBasedOnFocus}
                                    />
                                }
                                right={
                                    <TextInput.Icon
                                        name="menu-down"
                                        color={getColorBasedOnFocus}
                                    />
                                }
                                editable={false}
                                mode="outlined"
                                autoCapitalize="none"
                                placeholder="Category"
                                label="Category"
                                outlineColor={theme.colors.primaryDark}
                                dense
                                value={category}
                            />
                        </RNPickerSelect>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Pressable
                            onPress={() => setShowDatePicker(!showDatePicker)}
                        >
                            <View pointerEvents="none">
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            backgroundColor:
                                                theme.colors.primaryLight,
                                            minWidth: 150,
                                        },
                                    ]}
                                    left={
                                        <TextInput.Icon
                                            name="calendar-blank"
                                            color={getColorBasedOnFocus}
                                        />
                                    }
                                    editable={false}
                                    mode="outlined"
                                    autoCapitalize="none"
                                    placeholder="Category"
                                    label="Date"
                                    outlineColor={theme.colors.primaryDark}
                                    dense
                                    value={date.format("DD-MM-YYYY")}
                                />
                            </View>
                            <DatePickerModal
                                locale="en-GB"
                                mode="single"
                                visible={showDatePicker}
                                onDismiss={() => setShowDatePicker(false)}
                                date={date.toDate()}
                                onConfirm={({ date }) => {
                                    setShowDatePicker(false);
                                    setDate(dayjs(date));
                                }}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.controlsRow}>
                        <View>
                            <Pressable
                                onPress={() => setDurationModalVisible(true)}
                            >
                                <MaterialCommunityIcons
                                    name="checkbox-marked-circle-outline"
                                    color={theme.colors.primaryDark}
                                    size={40}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.controls}>
                            <Pressable>
                                <MaterialCommunityIcons
                                    name="content-save"
                                    color={theme.colors.primaryDark}
                                    size={40}
                                />
                            </Pressable>
                            <Pressable>
                                <MaterialCommunityIcons
                                    name="delete-forever"
                                    color={theme.colors.accentDark}
                                    size={40}
                                />
                            </Pressable>
                        </View>
                    </View>
                </Surface>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginHorizontal: 5,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    taskTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
        marginLeft: 10,
    },
    input: {
        marginVertical: 5,
        minWidth: 100,
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        flex: 1,
    },
    controlsRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    controls: { flexDirection: "row" },
});

export default Task;
