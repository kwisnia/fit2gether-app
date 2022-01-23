import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, FlatList, Pressable } from "react-native";
import { Surface, Avatar } from "react-native-paper";
import { AVATARS } from "./avatars";

type setAvatarAction = SetStateAction<
    5 | 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9 | 10 | 11 | 12
>;

const AvatarPicker: React.FunctionComponent<{
    setAvatarId: Dispatch<setAvatarAction>;
    dismiss: () => void;
}> = ({ setAvatarId, dismiss }) => {
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
                            setAvatarId(
                                Number(item.key) as unknown as setAvatarAction
                            );
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
