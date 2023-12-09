import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export function useForm(initialFormData: {
    id:'',
    name: '',
    location: '',
    date: '',
    time: '',
    link: '',
    usersWhoUpvoted: [],
    usersWhoDownvoted: [],
}) {
    const [formData, setFormData] = useState(initialFormData);
    const [invalid, setInvalid] = useState<boolean>(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    function isValid(): boolean {
        return Object.values(formData).every(
            (value) => typeof value === "string" && value.trim() !== "" && value.length >= 3
        );
    }

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        const { id } = formData;

        if (id) {
            try {
                const response = await axios.put(`/api/events/${id}`, formData);
                console.log('Event updated successfully:', response.data);
            } catch (error) {
                console.error('Error updating event:', error);
            }
        } else {
            try {
                const response = await axios.post('/api/events', formData);
                console.log('Event added successfully:', response.data);
            } catch (error) {
                console.error('Error adding event:', error);
            }
        }

        resetForm();
    }

    function resetForm(): void {
        setFormData(initialFormData);
    }

    return { formData, handleChange, isValid, handleSubmit, setFormData, resetForm, invalid };
}