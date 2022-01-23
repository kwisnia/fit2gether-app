import { Range } from "./Range";

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
