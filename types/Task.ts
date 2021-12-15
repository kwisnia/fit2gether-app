export interface Task {
    id: number;
    name: string;
    date: string;
    userId: number;
    category: {
        id: number;
        name: string;
    };
}
