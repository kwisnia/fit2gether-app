export interface DaysWithTasks {
    user: string[];
    buddy: string[];
}

export interface Dot {
    key: string;
    color: string;
}

export interface MarkedDates {
    [date: string]: {
        selected?: boolean;
        dots?: Dot[];
        selectedColor?: string;
    };
}
