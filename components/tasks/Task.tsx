import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme, Surface, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Task as TaskType } from "../../types/Task";

const CATEGORIES = [
    {
        label: "Training",
        value: "Training",
    },
    {
        label: "Nutrition",
        value: "Nutrition",
    },
];

const Task: React.FunctionComponent<{ task: TaskType }> = ({ task }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [title, setTitle] = React.useState(task.name);
    const [category, setCategory] = React.useState(
        CATEGORIES[task.categoryId].value
    );
    const theme = useTheme();

    const getColorBasedOnFocus = (focused: boolean) => {
        return focused ? theme.colors.primary : theme.colors.primaryDark;
    };

    return (
        <View>
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
                        <Pressable>
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
                                onChangeText={(text: string) =>
                                    setCategory(text)
                                }
                            />
                        </Pressable>
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
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        flex: 1,
    },
});

export default Task;
