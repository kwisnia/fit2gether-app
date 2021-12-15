import React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

type DrawerNavigationProp = {
    openDrawer: () => void;
};

const NavAppBar: React.FunctionComponent<{ title: string }> = ({ title }) => {
    const navigation = useNavigation<DrawerNavigationProp>();

    return (
        <Appbar.Header>
            <TouchableOpacity
                onPress={() => {
                    navigation.openDrawer();
                }}
            >
                <Avatar.Image
                    size={50}
                    source={{
                        uri: "https://cdn.discordapp.com/attachments/694564497662148679/915549066878922762/unknown.png",
                    }}
                ></Avatar.Image>
            </TouchableOpacity>
            <Appbar.Content
                title={title.toUpperCase()}
                color="white"
                style={styles.right}
            />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    right: {
        position: "absolute",
        right: 0,
        marginRight: 10,
    },
});

export default NavAppBar;
