import { FormEvent } from 'react';
import axios from 'axios';
import EventForm from '../../components/EventForm';
import './index.css';
import { useForm } from '../../resources/formUtils';

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

    const { formData, handleChange, isValid, resetForm } = useForm(initialFormData);

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        axios
            .post('/api/events', formData)
            .then((response) => {
                console.log('Event added successfully:', response.data);
                resetForm();
            })
            .catch((error) => {
                console.error('Error adding event:', error);
            });
    };

    return <EventForm formData={formData} isValid={isValid} handleSubmit={handleSubmit} onChange={handleChange} />;
}
