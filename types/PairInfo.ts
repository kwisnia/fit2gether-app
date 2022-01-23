import { Range } from "./Range";

export interface PairInfo {
    name: string;
    buddyId: number;
    buddyProfilePicture: Range;
    buddyName: string;
    experienceLevel: number;
    experience: number;
    experienceRequired: number;
    recentActivities: RecentActivity[];
}

export interface RecentActivity {
    name: string;
    userId: number;
    completionTime: string;
}
