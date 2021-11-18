import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Appbar, useTheme, Switch } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";

const NavAppBar: React.FunctionComponent<BottomTabHeaderProps> = ({
    route,
}) => {
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);

    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: theme?.colors.surface,
                },
            }}
        >
            <Appbar.Content title={route.name} />
            <Switch
                style={[{ backgroundColor: theme.colors.surface }]}
                color={theme.colors.accent}
                value={isThemeDark}
                onValueChange={toggleTheme}
            />
        </Appbar.Header>
    );
};

export default NavAppBar;
