import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { AddEventType } from '../../resources/types.tsx';
import { Link } from 'react-router-dom';

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
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        axios
            .post('/api/events', formData)
            .then((response) => {
                console.log('Event added successfully:', response.data);
                setEventCreated(true);
                setFormData(initialFormData);
            })
            .catch((error) => {
                console.error('Error adding event:', error);
            });
    };

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (eventCreated) {
            timer = setTimeout(() => {
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
                {Object.entries(initialFormData).map(([key]) => {
                    const inputKey = key as keyof AddEventType; // Explicitly cast key to keyof AddEventType
                    return (
                        <div key={key}>
                            <label>
                                <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[inputKey]}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <br />
                        </div>
                    );
                })}
                {eventCreated && <p>Event created</p>}
                <button type="submit">Add Event</button>
            </form>
        </>
    );
}