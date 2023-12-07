import { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import EventFormInput from '../EventFormInput';
import { Link } from 'react-router-dom';
import { EventFormProps } from '../../resources/types.tsx';

export default function EventForm({
                                      formData,
                                      handleChange,
                                      handleSubmit,
                                      handleDelete,
                                  }: EventFormProps): JSX.Element {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [deleteButtonState, setDeleteButtonState] = useState<'idle' | 'deleting' | 'deleted'>('idle');

    useEffect(() => {
        const hasInvalidField = Object.values(formData).some(
            (value) => typeof value === 'string' && (value.trim() === '' || value.length < 3)
        );
        setIsInvalid(hasInvalidField);
    }, [formData]);

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await handleSubmit(e);

            setTimeout(() => {
                setIsSaved(true);
                setIsLoading(false);
                setTimeout(() => {
                    setIsSaved(false); // Reset isSaved after navigating

                    // Navigate to the main page ("/")
                    window.location.href = '/';
                }, 1500);
            }, 1500);
        } catch (error) {
            console.error('Error during save:', error);
            setIsLoading(false);
        }
    };

    const handleDeleteEvent = async () => {
        setDeleteButtonState('deleting');

        try {
            if (handleDelete) {
                await handleDelete();
            }

            setDeleteButtonState('deleted');
            setTimeout(() => {
                setDeleteButtonState('idle');
                window.location.href = '/'; // Redirect to the main page
            }, 1500);
        } catch (error) {
            console.error('Error during delete:', error);
            setDeleteButtonState('idle');
        }
    };

    return (
        <>
            <EventFormInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <EventFormInput label="Location" name="location" value={formData.location} onChange={handleChange} required />
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
                className={`save-event-button ${isInvalid || isLoading ? 'disabled' : ''} ${isSaved ? 'saved' : ''}`}
                style={{ width: '100%' }}
                disabled={isInvalid || isLoading || isSaved}
                aria-busy={isLoading}
            >
                {isLoading ? 'Saving' : isSaved ? 'Saved' : 'Save Event'}
            </button>

            <button
                type="button"
                onClick={handleDeleteEvent}
                className={`delete-event-button ${deleteButtonState !== 'idle' ? 'disabled' : ''} ${
                    deleteButtonState === 'deleting' ? 'deleting' : deleteButtonState === 'deleted' ? 'deleted' : ''
                }`}
                style={{ width: '100%' }}
                disabled={deleteButtonState !== 'idle'}
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
