export interface SessionInfo {
    id: number;
    profilePicture: null;
    buddyProfilePicture: null;
    buddyId: number;
    token: {
        accessToken: string;
        refreshToken: string;
    };
    inviteCode: string;
    username: string;
    email: string;
}
