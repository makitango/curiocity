import {ChangeEvent} from "react";

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

export type EventListType = {
    events: EventType[];
};

export type AddEventType = {
    name: string;
    location: string;
    date: string;
    time: string;
    link: string;
};

export type UpdateEventType = AddEventType & {
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
};