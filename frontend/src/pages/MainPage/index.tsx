import { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from '../../components/EventList';
import { EventType } from '../../resources/types.tsx';

export default function MainPage() {
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
            <div>
                <EventList events={events} />
            </div>
        </>
    );
}
