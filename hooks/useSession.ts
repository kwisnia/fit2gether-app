import * as SecureStore from "expo-secure-store";
import React from "react";
import { SessionInfo } from "../types/SessionInfo";

const useSession = (): [SessionInfo | null, () => void] => {
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

    const refreshSessionInfo = React.useCallback(
        () => void getFromStorage(),
        [getFromStorage]
    );

    return [sessionInfo, refreshSessionInfo];
};

export default useSession;
