import { FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import EventForm from '../../components/EventForm';
import { useForm } from '../../resources/formUtils';
import './index.css';

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

    const { formData, handleChange, isValid, setFormData } = useForm(initialFormData);

    useEffect(() => {
        axios
            .get(`/api/events/${eventId}`)
            .then((response): void => {
                const eventToUpdate = response.data;
                setFormData(eventToUpdate); // Set the form data
            })
            .catch((error): void => {
                console.error('Error fetching event details:', error);
            });
    }, [eventId]);

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
        <EventForm
            formData={formData}
            isValid={isValid}
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
            onChange={handleChange}
        />
    );
}
