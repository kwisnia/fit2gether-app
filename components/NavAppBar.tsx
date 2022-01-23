import React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SessionContext } from "../context/SessionContext";
import { AVATARS } from "./settings/avatars";

type DrawerNavigationProp = {
    openDrawer: () => void;
};

const NavAppBar: React.FunctionComponent<{ title: string }> = ({ title }) => {
    const navigation = useNavigation<DrawerNavigationProp>();
    const [sessionInfo] = React.useContext(SessionContext);

    return (
        <Appbar.Header>
            <TouchableOpacity
                onPress={() => {
                    navigation.openDrawer();
                }}
                style={styles.left}
            >
                <Avatar.Image
                    size={50}
                    source={AVATARS[sessionInfo?.profilePicture || 1]}
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
    left: {
        marginLeft: 10,
    },
});

export default NavAppBar;
