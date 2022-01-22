export interface PairInfo {
    name: string;
    buddyId: number;
    buddyProfilePicture: number;
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
