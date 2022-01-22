const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type Range = typeof range[number];

export interface SessionInfo {
    id: number;
    profilePicture: Range;
    buddyProfilePicture: Range;
    buddyId: number;
    token: {
        accessToken: string;
        refreshToken: string;
    };
    inviteCode: string;
    username: string;
    email: string;
    selectedTheme: string;
}
