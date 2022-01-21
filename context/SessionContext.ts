import React from "react";
import { SessionInfo } from "../types/SessionInfo";

export const SessionContext = React.createContext<
    [
        sessionInfo: SessionInfo | null,
        refreshSessionInfo: () => void,
        updateSession: (_: SessionInfo) => void
            ]
            >([null, () => {}, () => {}]);
