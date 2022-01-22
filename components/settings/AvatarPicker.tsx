/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { StyleSheet, Text, FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Surface, useTheme, Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AVATARS } from "./avatars";

const AvatarPicker: React.FunctionComponent<{
    setAvatarId: (value: number) => void;
    dismiss: () => void;
}> = ({ setAvatarId, dismiss }) => {
    const theme = useTheme();
    return (
        <Surface style={styles.container}>
            <Text style={styles.text}>Pick your Avatar:</Text>
            <FlatList
                data={Object.entries(AVATARS).map(([key, value]) => ({
                    key,
                    value,
                }))}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [
                            styles.avatar,
                            {
                                opacity: pressed ? 0.6 : 1,
                            },
                        ]}
                        onPress={() => {
                            setAvatarId(Number(item.key));
                            dismiss();
                        }}
                    >
                        <Avatar.Image
                            key={item.key}
                            size={80}
                            source={item.value}
                        />
                    </Pressable>
                )}
                numColumns={3}
            />
        </Surface>
    );
};

export default AvatarPicker;

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        marginHorizontal: 25,
        padding: 15,
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 25,
        fontWeight: "400",
        textAlign: "center",
    },
    avatar: {
        margin: 5,
    },
});
