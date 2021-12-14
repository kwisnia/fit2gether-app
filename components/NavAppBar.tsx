import React from "react";
import { Appbar, useTheme, Switch } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";
import { StyleSheet } from "react-native";

const NavAppBar: React.FunctionComponent<{ title: string }> = ({ title }) => {
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);

    return (
        <Appbar.Header>
            <Switch
                color={theme.colors.accent}
                value={isThemeDark}
                onValueChange={toggleTheme}
            />
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
