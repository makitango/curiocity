import { ChangeEvent, useState } from 'react';

export const useForm = (initialFormData: any) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isValid: boolean = Object.values(formData).every(
        (value) => typeof value === 'string' && value.trim() !== '' && value.length >= 3
    );

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return { formData, handleChange, isValid, setFormData, resetForm };
};