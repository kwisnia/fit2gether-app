import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { SessionInfo } from "../types/SessionInfo";

const useSession = (): [
    SessionInfo | null,
    () => void,
    (_: SessionInfo) => void
] => {
    const [sessionInfo, setSessionInfo] = React.useState<SessionInfo | null>(
        null
    );
    const getFromStorage = React.useCallback(async () => {
        const result = await SecureStore.getItemAsync("session");
        if (result !== null) {
            setSessionInfo(JSON.parse(result) as SessionInfo);
        } else {
            setSessionInfo(result);
        }
    }, []);
    React.useEffect(() => {
        void getFromStorage();
    }, [getFromStorage]);

    const refreshSessionInfo = React.useCallback(
        () => void getFromStorage(),
        [getFromStorage]
    );

    const updateSession = React.useCallback(
        async (newInfo: SessionInfo) => {
            await SecureStore.setItemAsync("session", JSON.stringify(newInfo));
            axios.defaults.headers.common.Authorization = `Bearer ${newInfo.token.accessToken}`;
            refreshSessionInfo();
        },
        [refreshSessionInfo]
    );

    return [sessionInfo, refreshSessionInfo, updateSession];
};

export default useSession;
