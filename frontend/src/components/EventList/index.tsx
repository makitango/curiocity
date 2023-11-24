import {EventType, EventListType} from "../../resources/types.tsx";

export default function EventList({events}: Readonly<EventListType>) {

    return (
        <div>
            {!events ? (
                <strong>Events are loading</strong>
            ) : (
                <ul>
                    <h2>Event List</h2>
                    {events.map((event:EventType) => (
                        <li key={event.id}>
                            <h3>Title: {event.name}</h3>
                            <p>Location: {event.location}</p>
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                            <p>Link: {event.link}</p>
                            <p>Upvotes: {event.usersWhoUpvoted.length}</p>
                            <p>Downvotes: {event.usersWhoDownvoted.length}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}