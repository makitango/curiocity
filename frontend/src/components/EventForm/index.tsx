import {useState, useEffect, FormEvent} from 'react';
import EventFormInput from '../EventFormInput';
import {Link, useNavigate} from 'react-router-dom';
import {DeleteButtonStateType, EventFormType, SaveButtonStateType} from '../../resources/types.tsx';

export default function EventForm({
                                      formData,
                                      handleChange,
                                      handleSubmit,
                                      handleDelete,
                                  }: EventFormType): JSX.Element {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [saveButtonState, setSaveButtonState] = useState<SaveButtonStateType>('idle');
    const [deleteButtonState, setDeleteButtonState] = useState<DeleteButtonStateType>('idle');
    const navigate = useNavigate();

    useEffect(() => {
        const hasInvalidField: boolean = Object.values(formData).some(
            (value) => typeof value === 'string' && (value.trim() === '' || value.length < 3)
        );
        setIsInvalid(hasInvalidField);
    }, [formData]);

    const handleSaveButton = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        setSaveButtonState('saving');

        try {
            if (handleSubmit) {
                await handleSubmit(e);

                setTimeout(() => {
                    setSaveButtonState('saved');
                    setTimeout(() => {
                        setSaveButtonState('idle');
                        navigate('/');
                    }, 1500);
                }, 1500);
            } else {
                console.error('handleSubmit is not defined');
                setSaveButtonState('idle');
            }
        } catch (error) {
            console.error('Error during save:', error);
            setSaveButtonState('idle');
        }
    };

    const handleDeleteButton = async (): Promise<void> => {
        setDeleteButtonState('deleting');
        try {
            if (handleDelete) {
                await handleDelete();
                setTimeout(() => {
                    setDeleteButtonState('deleted');
                    setTimeout(() => {
                        setDeleteButtonState('idle');
                        navigate('/');
                    }, 1500);
                }, 1500);
            } else {
                console.error('handleDelete is not defined');
                setDeleteButtonState('idle');
            }
        } catch (error) {
            console.error('Error during delete:', error);
            setDeleteButtonState('idle');
        }
    };

    return (
        <article className="detail-view">
            <h1>{formData.id ? 'Update Event' : 'Add Event'}</h1>
            <>
                <EventFormInput label="Name" name="name" value={formData.name} onChange={handleChange} required/>
                <EventFormInput label="Location" name="location" value={formData.location} onChange={handleChange}
                                required/>
                <EventFormInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange}
                                required/>
                <EventFormInput label="Time" name="time" type="time" value={formData.time} onChange={handleChange}
                                required/>
                <EventFormInput label="Link" name="link" value={formData.link} onChange={handleChange} required/>

                {formData.id && (formData.usersWhoUpvoted || formData.usersWhoDownvoted) && (
                    <>
                        <p>Upvotes: {formData.usersWhoUpvoted?.length}</p>
                        <p>Downvotes: {formData.usersWhoDownvoted?.length}</p>
                    </>
                )}

                <button
                    type="submit"
                    onClick={handleSaveButton}
                    className={`save-event-button ${isInvalid || saveButtonState === 'saving' ? 'disabled' : ''} ${
                        saveButtonState === 'saved' ? 'saved' : ''
                    }`}
                    style={{width: '100%'}}
                    disabled={isInvalid || saveButtonState === 'saving' || saveButtonState === 'saved'}
                    aria-busy={saveButtonState === 'saving'}
                >
                    {saveButtonState === 'saving' ? 'Saving' : saveButtonState === 'saved' ? 'Saved' : 'Save Event'}
                </button>

                {formData.id && (
                    <button
                        type="button"
                        onClick={handleDeleteButton}
                        className={`delete-event-button ${deleteButtonState !== 'idle' ? 'disabled' : ''} ${
                            deleteButtonState === 'deleting' ? 'deleting' : deleteButtonState === 'deleted' ? 'deleted' : ''
                        }`}
                        style={{width: '100%'}}
                        disabled={deleteButtonState !== 'idle'}
                        aria-busy={deleteButtonState === 'deleting'}
                    >
                        {deleteButtonState === 'deleting' ? 'Deleting...' : deleteButtonState === 'deleted' ? 'Deleted' : 'Delete Event'}
                    </button>
                )}

                <Link to="/" style={{textDecoration: 'none', width: '100%'}}>
                    <button type="button" className="outline secondary" style={{width: '100%'}}>
                        Cancel
                    </button>
                </Link>
            </>
        </article>
    );
}