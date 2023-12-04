import { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from '../../components/EventList';
import { EventType } from '../../resources/types.tsx';
import {Link} from "react-router-dom";

export default function MainPage(): JSX.Element {
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        axios
            .get('/api/events')
            .then((response) => {
                setEvents(response.data as EventType[]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <Link to="add">Add Event</Link>
            <h1>MainPage</h1>
            <div>
                <EventList events={events} />
            </div>
        </>
    );
}