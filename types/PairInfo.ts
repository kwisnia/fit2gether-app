export interface PairInfo {
    name: string;
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
