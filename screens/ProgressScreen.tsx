import React from "react";
import { ScrollView } from "react-native";
import ExperienceBar from "../components/progress/ExperienceBar";
import RecentActivitySurface from "../components/progress/RecentActivitySurface";
import { PairInfo } from "../types/PairInfo";
import useSession from "../hooks/useSession";
import axios, { AxiosResponse } from "axios";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

const ProgressScreen = () => {
    //TODO: make it fetch *happy Gretchen noises*
    /* on wednesdays we wear pink */
    const [pairInfo, setPairInfo] = React.useState<PairInfo | null>(null);
    const isFocused = useIsFocused();
    const [session, refreshSessionInfo] = useSession();
    const fetchPairInfo = async () => {
        const pair: AxiosResponse<PairInfo> = await axios.get("/pairInfo");
        setPairInfo(pair.data);
    };
    React.useEffect(() => {
        void fetchPairInfo();
    }, [session]);

    React.useEffect(() => {
        if (isFocused) {
            refreshSessionInfo();
            void fetchPairInfo();
        }
    }, [isFocused, refreshSessionInfo]);

    return (
        <ScrollView>
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
