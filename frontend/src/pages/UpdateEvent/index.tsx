import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UpdateEventType } from "../../resources/types.tsx";

export default function UpdateEvent(): JSX.Element {
    const { eventId } = useParams<{ eventId: string }>();

    const initialFormData: UpdateEventType = {
        name: "",
        location: "",
        date: "",
        time: "",
        link: "",
        usersWhoUpvoted: [],
        usersWhoDownvoted: [],
    };

    const [formData, setFormData] = useState<UpdateEventType>(initialFormData);
    const [eventUpdated, setEventUpdated] = useState<boolean>(false);

    useEffect((): void => {
        axios
            .get(`/api/events/${eventId}`)
            .then((response): void => {
                const eventToUpdate: UpdateEventType = response.data as UpdateEventType;
                setFormData(eventToUpdate);
            })
            .catch((error): void => {
                console.error("Error fetching event details:", error);
            });
    }, [eventId]);

    useEffect((): void => {
        axios
            .get(`/api/events/${eventId}/details`)
            .then((response): void => {
                const eventDetailsFromServer: UpdateEventType = response.data;
                setFormData(eventDetailsFromServer);
            })
            .catch((error): void => {
                console.error("Error fetching event details:", error);
            });
    }, [eventId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData: UpdateEventType) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        axios
            .put(`/api/events/${eventId}`, formData)
            .then((response): void => {
                console.log("Event updated successfully:", response.data);
                setEventUpdated(true);
            })
            .catch((error): void => {
                console.error("Error updating event:", error);
            });
    };

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (eventUpdated) {
            timer = setTimeout((): void => {
                setEventUpdated(false);
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [eventUpdated]);

    return (
        <>
            <Link to="/">MainPage</Link>
            <h1>Update Event</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name:</span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    <span>Location:</span>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    <span>Date:</span>
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    <span>Time:</span>
                    <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    <span>Link:</span>
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <p>Upvotes: {formData.usersWhoUpvoted.length}</p>
                <p>Downvotes: {formData.usersWhoDownvoted.length}</p>
                {eventUpdated && <p>Event updated</p>}
                <button type="submit">Update Event</button>
            </form>
        </>
    );
}
