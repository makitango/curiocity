import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { AddEventType } from '../../resources/types.tsx';
import { Link } from 'react-router-dom';
import EventFormInput from '../../components/EventFormInput';

export default function AddEvent(): JSX.Element {
    const initialFormData: AddEventType = {
        name: '',
        location: '',
        date: '',
        time: '',
        link: '',
    };

    const [formData, setFormData] = useState<AddEventType>(initialFormData);
    const [eventCreated, setEventCreated] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData:AddEventType) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        axios
            .post('/api/events', formData)
            .then((response): void => {
                console.log('Event added successfully:', response.data);
                setEventCreated(true);
                setFormData(initialFormData);
            })
            .catch((error): void => {
                console.error('Error adding event:', error);
            });
    };

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (eventCreated) {
            timer = setTimeout((): void => {
                setEventCreated(false);
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [eventCreated]);

    return (
        <>
            <Link to="/">MainPage</Link>
            <h1>Add Event</h1>
            <form onSubmit={handleSubmit}>
                <EventFormInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <EventFormInput label="Location" name="location" value={formData.location} onChange={handleChange} required />
                <EventFormInput label="Date" name="date" value={formData.date} onChange={handleChange} required />
                <EventFormInput label="Time" name="time" value={formData.time} onChange={handleChange} required />
                <EventFormInput label="Link" name="link" value={formData.link} onChange={handleChange} required />
                {eventCreated && <p>Event created</p>}
                <button type="submit">Add Event</button>
            </form>
        </>
    );
}
