import React from "react";
import { View, Text, StyleSheet, ImageSourcePropType } from "react-native";
import { Surface, Avatar, useTheme } from "react-native-paper";
import { SessionContext } from "../../context/SessionContext";
import { PairInfo } from "../../types/PairInfo";
import { AVATARS } from "../settings/avatars";

const UserHeader: React.FunctionComponent<{
    icon: ImageSourcePropType;
    name: string | undefined;
}> = ({ icon, name }) => {
    return (
        <View style={styles.userIcon}>
            <Avatar.Image size={50} source={icon}></Avatar.Image>
            <Text style={styles.userText}>{name}</Text>
        </View>
    );
};

const ExperienceBar: React.FunctionComponent<{ pairInfo: PairInfo | null }> = ({
    pairInfo,
}) => {
    const theme = useTheme();
    const [sessionInfo] = React.useContext(SessionContext);

    return (
        <View>
            <Surface style={styles.container}>
                <View style={styles.header}>
                    <UserHeader
                        icon={AVATARS[sessionInfo?.profilePicture || 1]}
                        name={pairInfo?.name}
                    />
                    <UserHeader
                        icon={AVATARS[sessionInfo?.buddyProfilePicture || 1]}
                        name={pairInfo?.buddyName}
                    />
                </View>
            </Surface>
            <Surface
                style={[
                    styles.container,
                    {
                        marginTop: 0,
                        backgroundColor: theme.colors.primaryLight,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 60,
                    },
                ]}
            >
                <Text style={styles.levelText}>{`LEVEL ${
                    pairInfo?.experienceLevel || 1
                }`}</Text>
                <Surface style={styles.experienceBarBackground}>
                    <View
                        style={{
                            paddingVertical: 11,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            backgroundColor: theme.colors.accent,
                            width: `${
                                pairInfo
                                    ? (pairInfo.experience /
                                          pairInfo.experienceRequired) *
                                      100
                                    : 0
                            }%`,
                        }}
                    ></View>
                </Surface>
                <Text style={styles.levelText}>{`${pairInfo?.experience || 1}/${
                    pairInfo?.experienceRequired || 100
                } XP`}</Text>
            </Surface>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 1,
        marginHorizontal: 5,
        marginTop: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    userIcon: {
        alignItems: "center",
    },
    userText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },
    levelText: {
        color: "white",
        fontWeight: "500",
        fontSize: 22,
        marginVertical: 10,
    },
    experienceBarBackground: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50,
        marginVertical: 7,
    },
});

export default ExperienceBar;
