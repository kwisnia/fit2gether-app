import React from "react";

export const TabContext = React.createContext({
    tab: "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTab: (s: string) => {},
});
