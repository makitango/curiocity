import { ChangeEvent } from 'react';

export type EventType = {
    id: string;
    name: string;
    location: string;
    date: string;
    time: string;
    link: string;
    usersWhoUpvoted: string[];
    usersWhoDownvoted: string[];
};

export type EventFormInputType = {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type?: string;
    placeholder?: string;
};

export type EventFormType = {
    formData: {
        name: string;
        location: string;
        date: string;
        time: string;
        link: string;
        usersWhoUpvoted?: string[];
        usersWhoDownvoted?: string[];
    };
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => Promise<void>;
    handleDelete?: () => void;
};

export type SaveButtonStateType = 'idle' | 'saving' | 'saved';
export type DeleteButtonStateType = 'idle' | 'deleting' | 'deleted';

