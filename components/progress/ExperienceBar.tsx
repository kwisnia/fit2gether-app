import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Surface, Avatar, useTheme } from "react-native-paper";
import { PairInfo } from "../../types/PairInfo";

const UserHeader: React.FunctionComponent<{ icon: string; name: string | undefined }> = ({
    icon,
    name,
}) => {
    return (
        <View style={styles.userIcon}>
            <Avatar.Image
                size={50}
                source={{
                    uri: icon,
                }}
            ></Avatar.Image>
            <Text style={styles.userText}>{name}</Text>
        </View>
    );
};

const ExperienceBar: React.FunctionComponent<{ pairInfo: PairInfo | null }> = ({
    pairInfo,
}) => {
    const theme = useTheme();

    return (
        <View>
            <Surface style={styles.container}>
                <View style={styles.header}>
                    <UserHeader
                        icon="https://static.wikia.nocookie.net/7f013cd3-16cd-4b47-a30e-94ef61d8391d"
                        name={pairInfo?.name}
                    />
                    <UserHeader
                        icon="https://i.redd.it/rbbzu2ah8pk61.jpg"
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
                <Text
                    style={styles.levelText}
                >{`LEVEL ${pairInfo!.experienceLevel}`}</Text>
                <Surface style={styles.experienceBarBackground}>
                    <View
                        style={{
                            paddingVertical: 11,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            backgroundColor: theme.colors.accent,
                            width: `${
                                (pairInfo!.experience /
                                    pairInfo!.experienceRequired) *
                                100
                            }%`,
                        }}
                    ></View>
                </Surface>
                <Text
                    style={styles.levelText}
                >{`${pairInfo!.experience}/${pairInfo!.experienceRequired} XP`}</Text>
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
    experienceBarFill: {
        paddingVertical: 11,
    },
});

export default ExperienceBar;
