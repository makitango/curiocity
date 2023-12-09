import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './index.css';
import {EventType} from '../../resources/types';

export default function EventList(): JSX.Element {
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect((): void => {
        axios
            .get('/api/events')
            .then((response): void => {
                setEvents(response.data as EventType[]);
            })
            .catch((error): void => {
                console.error(error);
            });
    }, []);

    return (
        <div className="event-list-container">
            {!events ? (
                <strong>Events are loading</strong>
            ) : (
                <ul className="event-list">
                    <Link to="add" style={{textDecoration: 'none'}}>
                        <article className="add-event-item">
                            <h1>Add Event</h1>
                        </article>
                    </Link>
                    {events.map((event: EventType) => (
                        <Link to={`/update/${event.id}`} style={{textDecoration: 'none'}} key={event.id}>
                            <article className="event-item">
                                <h3>{event.name}</h3>
                                <p>{event.location}</p>
                                <p>{event.date}</p>
                                <p>{event.time}</p>
                                <footer style={{marginTop: 'auto'}}>
                                    <p>Upvotes: {event.usersWhoUpvoted.length}</p>
                                    <p>Downvotes: {event.usersWhoDownvoted.length}</p>
                                </footer>
                            </article>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
}
