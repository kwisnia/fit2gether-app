export type RootStackParamList = {
    Login: Record<string, never>;
    MainApp: Record<string, never>;
    Tabs: {
        setTitle: (title?: string) => void;
    };
};
