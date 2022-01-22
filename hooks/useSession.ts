import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { SessionInfo } from "../types/SessionInfo";

const useSession = (): [
    SessionInfo | null,
    () => void,
    (_: SessionInfo) => void,
    boolean
] => {
    const [sessionInfo, setSessionInfo] = React.useState<SessionInfo | null>(
        null
    );
    const [isInitialLoading, setIsInitialLoading] = React.useState(true);
    const getFromStorage = React.useCallback(async () => {
        const result = await SecureStore.getItemAsync("session");
        if (result !== null) {
            const info = JSON.parse(result) as SessionInfo;
            setSessionInfo(info);
            axios.defaults.headers.common.Authorization = `Bearer ${info.token.accessToken}`;
        } else {
            setSessionInfo(result);
        }
    }, []);
    React.useEffect(() => {
        void (async () => {
            await getFromStorage();
            setTimeout(() => setIsInitialLoading(false), 1000);
        })();
    }, [getFromStorage]);

    const refreshSessionInfo = React.useCallback(
        () => void getFromStorage(),
        [getFromStorage]
    );

    const updateSession = React.useCallback(
        async (newInfo: SessionInfo) => {
            await SecureStore.setItemAsync("session", JSON.stringify(newInfo));
            refreshSessionInfo();
        },
        [refreshSessionInfo]
    );

    return [sessionInfo, refreshSessionInfo, updateSession, isInitialLoading];
};

export default useSession;
