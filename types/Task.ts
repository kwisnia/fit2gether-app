export interface Task {
    id: number;
    name: string;
    date: string;
    userId: number;
    category: {
        value: number;
        label: string;
    };
}
