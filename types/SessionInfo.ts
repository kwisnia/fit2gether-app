export interface SessionInfo {
    id: number;
    profilePicture: number;
    buddyProfilePicture: number;
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
