import React, {ChangeEvent, FormEvent} from 'react';

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
        id: string;
        name: string;
        location: string;
        date: string;
        time: string;
        link: string;
        usersWhoUpvoted?: string[];
        usersWhoDownvoted?: string[];
    };
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent) => Promise<void>;
    handleDelete?: () => void;
};

export type SaveButtonStateType = 'idle' | 'saving' | 'saved';
export type DeleteButtonStateType = 'idle' | 'deleting' | 'deleted';

export type SaveEventButtonType = {
    isInvalid: boolean;
    handleSaveButton: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

export type DeleteEventButtonType = {
    handleDeleteButton: () => Promise<void>;
};