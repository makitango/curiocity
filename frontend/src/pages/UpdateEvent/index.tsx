import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from '../../components/EventForm';
import './index.css';
import {useParams} from "react-router-dom";

export default function UpdateEvent(): JSX.Element {
    const { eventId } = useParams<{ eventId: string }>();

    const initialFormData = {
        name: '',
        location: '',
        date: '',
        time: '',
        link: '',
        usersWhoUpvoted: [],
        usersWhoDownvoted: [],
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        axios
            .get(`/api/events/${eventId}`)
            .then((response): void => {
                const eventToUpdate = response.data;
                setFormData(eventToUpdate);
            })
            .catch((error): void => {
                console.error('Error fetching event details:', error);
            });
    }, [eventId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isValid: boolean = Object.values(formData).every(
        (value) => typeof value === 'string' && value.trim() !== '' && value.length >= 3
    );

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        axios
            .put(`/api/events/${eventId}`, formData)
            .then((response): void => {
                console.log('Event updated successfully:', response.data);
            })
            .catch((error): void => {
                console.error('Error updating event:', error);
            });
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await axios.delete(`/api/events/${eventId}`);

        } catch (error) {
            console.error('Error during delete:', error);
        }
    };

    return (
        <>
            <article className="detail-view">
                <h1>Update Event</h1>
                <form onSubmit={handleSubmit}>
                    <EventForm formData={formData} isValid={isValid} handleChange={handleChange} handleSubmit={handleSubmit} handleDelete={handleDelete} />
                </form>
            </article>
        </>
    );
}