import React, { useContext } from "react";
import { RefreshControl, ScrollView } from "react-native";
import ExperienceBar from "../components/progress/ExperienceBar";
import RecentActivitySurface from "../components/progress/RecentActivitySurface";
import { PairInfo } from "../types/PairInfo";
import axios, { AxiosResponse } from "axios";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { SessionContext } from "../context/SessionContext";

const ProgressScreen = () => {
    //TODO: make it fetch *happy Gretchen noises*
    /* on wednesdays we wear pink */
    const [pairInfo, setPairInfo] = React.useState<PairInfo | null>(null);
    const isFocused = useIsFocused();
    const [sessionInfo, refreshSessionInfo, updateSessionInfo] =
        useContext(SessionContext);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchPairInfo = async () => {
        const pair: AxiosResponse<PairInfo> = await axios.get("/pairInfo");
        setPairInfo(pair.data);
    };
    React.useEffect(() => {
        void fetchPairInfo();
    }, [sessionInfo]);

    React.useEffect(() => {
        if (isFocused) {
            refreshSessionInfo();
            void fetchPairInfo();
        }
    }, [isFocused, refreshSessionInfo]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchPairInfo();
        if (
            sessionInfo?.buddyProfilePicture !==
                pairInfo?.buddyProfilePicture &&
            sessionInfo &&
            pairInfo
        ) {
            updateSessionInfo({
                ...sessionInfo,
                buddyProfilePicture: pairInfo?.buddyProfilePicture,
            });
        }
        setRefreshing(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pairInfo, updateSessionInfo]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {pairInfo ? (
                <ScrollView>
                    <ExperienceBar pairInfo={pairInfo} />
                    <RecentActivitySurface
                        activities={pairInfo.recentActivities}
                    />
                </ScrollView>
            ) : (
                <ActivityIndicator />
            )}
        </ScrollView>
    );
};

export default ProgressScreen;
