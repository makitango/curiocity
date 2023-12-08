import { useState, useEffect, FormEvent } from 'react';
import EventFormInput from '../EventFormInput';
import { Link, useNavigate } from 'react-router-dom';
import { EventFormProps } from '../../resources/types.tsx';

type SaveButtonState = 'idle' | 'saving' | 'saved';

export default function EventForm({
                                      formData,
                                      handleChange,
                                      handleSubmit,
                                      handleDelete,
                                  }: EventFormProps): JSX.Element {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [saveButtonState, setSaveButtonState] = useState<SaveButtonState>('idle');
    const [deleteButtonState, setDeleteButtonState] = useState<'idle' | 'deleting' | 'deleted'>('idle');
    const navigate = useNavigate();
    useEffect(() => {
        const hasInvalidField: boolean = Object.values(formData).some(
            (value) => typeof value === 'string' && (value.trim() === '' || value.length < 3)
        );
        setIsInvalid(hasInvalidField);
    }, [formData]);

    const handleSave = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        setSaveButtonState('saving');

        try {
            await handleSubmit(e);

            setTimeout(() => {
                setSaveButtonState('saved');
                setTimeout(() => {
                    setSaveButtonState('idle');
                    navigate('/');
                }, 1500);
            }, 1500);
        } catch (error) {
            console.error('Error during save:', error);
            setSaveButtonState('idle');
        }
    };

    const handleDeleteButton = async (): Promise<void> => {
        if (handleDelete) {
            setDeleteButtonState('deleting');
            try {
                await handleDelete();
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setDeleteButtonState('deleted');
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setDeleteButtonState('idle');
                navigate('/');
            } catch (error) {
                console.error('Error during delete:', error);
                setDeleteButtonState('idle');
            }
        }
    };

    return (
        <>
            <EventFormInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <EventFormInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
            />
            <EventFormInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            <EventFormInput label="Time" name="time" type="time" value={formData.time} onChange={handleChange} required />
            <EventFormInput label="Link" name="link" value={formData.link} onChange={handleChange} required />

            {formData.id && (formData.usersWhoUpvoted || formData.usersWhoDownvoted) && (
                <>
                    <p>Upvotes: {formData.usersWhoUpvoted?.length}</p>
                    <p>Downvotes: {formData.usersWhoDownvoted?.length}</p>
                </>
            )}

            <button
                type="submit"
                onClick={handleSave}
                className={`save-event-button ${isInvalid || saveButtonState === 'saving' ? 'disabled' : ''} ${
                    saveButtonState === 'saved' ? 'saved' : ''
                }`}
                style={{ width: '100%' }}
                disabled={isInvalid || saveButtonState === 'saving' || saveButtonState === 'saved'}
                aria-busy={saveButtonState === 'saving'}
            >
                {saveButtonState === 'saving' ? 'Saving' : saveButtonState === 'saved' ? 'Saved' : 'Save Event'}
            </button>

            <button
                type="button"
                onClick={handleDeleteButton}
                className={`delete-event-button ${deleteButtonState !== 'idle' ? 'disabled' : ''} ${
                    deleteButtonState === 'deleting' ? 'deleting' : deleteButtonState === 'deleted' ? 'deleted' : ''
                }`}
                style={{ width: '100%' }}
                disabled={deleteButtonState !== 'idle'}
                aria-busy={deleteButtonState === 'deleting'}
            >
                {deleteButtonState === 'deleting' ? 'Deleting...' : deleteButtonState === 'deleted' ? 'Deleted' : 'Delete Event'}
            </button>

            <Link to="/" style={{ textDecoration: 'none', width: '100%' }}>
                <button type="button" className="outline secondary" style={{ width: '100%' }}>
                    Cancel
                </button>
            </Link>
        </>
    );
}