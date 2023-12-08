import {ChangeEvent, FormEvent, useState} from 'react';
import axios from 'axios';
import EventForm from '../../components/EventForm';
import './index.css';

export default function AddEvent(): JSX.Element {
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const isValid: boolean = Object.values(formData).every(
        (value) => typeof value === 'string' && value.trim() !== '' && value.length >= 3
    );

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        axios
            .post('/api/events', formData)
            .then((response) => {
                console.log('Event added successfully:', response.data);
                setFormData(initialFormData);
            })
            .catch((error) => {
                console.error('Error adding event:', error);
            });
    };

    return (
        <>
                <EventForm formData={formData} isValid={isValid}
                           handleSubmit={handleSubmit} onChange={handleChange}/>
        </>
    );
}