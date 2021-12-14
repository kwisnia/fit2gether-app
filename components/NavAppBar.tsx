import React from "react";
import { Appbar, useTheme, Switch, Avatar } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const NavAppBar: React.FunctionComponent<{ title: string }> = ({ title }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);

    return (
        <Appbar.Header>
            <Switch
                color={theme.colors.accent}
                value={isThemeDark}
                onValueChange={toggleTheme}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.openDrawer(); // pomocy, nie wiem jak to otypowac
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
