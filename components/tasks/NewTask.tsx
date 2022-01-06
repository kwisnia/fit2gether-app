import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme, Surface, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Category as CategoryType } from "../../types/Category";
import RNPickerSelect from "react-native-picker-select";
import { DatePickerModal } from "react-native-paper-dates";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const NewTask: React.FunctionComponent<{
    refresh: () => Promise<void>;
    categories: CategoryType[];
}> = ({ refresh, categories }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [category, setCategory] = React.useState("");
    const theme = useTheme();

    const getColorBasedOnFocus = (focused: boolean) => {
        return focused ? theme.colors.accent : theme.colors.accentDark;
    };

    return (
        <View>
            <Pressable onPress={() => setIsFocused(!isFocused)}>
                <Surface
                    style={[
                        styles.container,
                        {
                            backgroundColor: isFocused
                                ? theme.colors.accentDark
                                : theme.colors.accent,
                        },
                    ]}
                >
                    <MaterialCommunityIcons
                        name="open-in-new"
                        color={theme.colors.primaryDark}
                        size={40}
                    />
                    <Text style={styles.taskTitle}>Add new task</Text>
                </Surface>
            </Pressable>
            {isFocused ? (
                <Surface
                    style={[
                        styles.container,
                        {
                            marginTop: 0,
                            backgroundColor: theme.colors.accentLight,
                            flex: 1,
                            flexDirection: "column",
                        },
                    ]}
                >
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.accentLight },
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
                            outlineColor={theme.colors.accentDark}
                            activeOutlineColor={theme.colors.accent}
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
                                            theme.colors.accentLight,
                                        minWidth: 150,
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
                                outlineColor={theme.colors.accentDark}
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
                                                theme.colors.accentLight,
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
                                    outlineColor={theme.colors.accentDark}
                                    dense
                                    value={
                                        date
                                            ? dayjs(date).format("DD-MM-YYYY")
                                            : ""
                                    }
                                />
                            </View>
                            <DatePickerModal
                                locale="en-GB"
                                mode="single"
                                visible={showDatePicker}
                                onDismiss={() => setShowDatePicker(false)}
                                date={date}
                                onConfirm={({ date }) => {
                                    setShowDatePicker(false);
                                    setDate(date);
                                }}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.controls}>
                        <Pressable
                            onPress={async () => {
                                await refresh();
                                setDate(undefined);
                                setTitle("");
                                setCategory("");
                                setIsFocused(false);
                            }}
                        >
                            <MaterialCommunityIcons
                                name="checkbox-marked-circle-outline"
                                color={theme.colors.accentDark}
                                size={40}
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
        minWidth: 100,
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        flex: 1,
    },
    controls: {
        flexDirection: "row",
        marginLeft: "auto",
    },
});

export default NewTask;
