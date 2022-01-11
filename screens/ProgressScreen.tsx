import React from "react";
import { ScrollView } from "react-native";
import ExperienceBar from "../components/progress/ExperienceBar";
import RecentActivitySurface from "../components/progress/RecentActivitySurface";
import { PairInfo } from "../types/PairInfo";

const PAIR_INFO: PairInfo = {
    name: "Albedo",
    buddyName: "Hu Tao",
    experienceLevel: 1,
    experience: 250,
    experienceRequired: 1890,
    recentActivities: [
        {
            name: "Prank Zhongli",
            userId: 5,
            completionTime: "2021-12-15T21:31:14.762Z",
        },
        {
            name: "Embarass Sucrose",
            userId: 5,
            completionTime: "2021-12-15T21:31:14.762Z",
        },
        {
            name: "Bomb fishing with Klee",
            userId: 5,
            completionTime: "2021-12-15T21:31:14.762Z",
        },
    ],
};

const ProgressScreen = () => {
    //TODO: make it fetch *happy Gretchen noises*
    const [pairInfo] = React.useState(PAIR_INFO);

    return (
        <ScrollView>
            <ExperienceBar pairInfo={pairInfo} />
            <RecentActivitySurface activities={pairInfo.recentActivities} />
        </ScrollView>
    );
};

export default ProgressScreen;
