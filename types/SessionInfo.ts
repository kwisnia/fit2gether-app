export interface SessionInfo {
    id: number;
    profilePicture: string | null;
    buddyProfilePicture: string | null;
    buddyId: number;
    token: {
        accessToken: string;
        refreshToken: string;
    };
    inviteCode: string;
    username: string;
    email: string;
}
