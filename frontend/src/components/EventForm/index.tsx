import { useEffect, useState } from "react";
import { EventFormType } from '../../resources/types';
import EventFormInput from '../EventFormInput';
import SaveEventButton from "../Buttons/SaveEventButton";
import DeleteEventButton from "../Buttons/DeleteEventButton";
import CancelChangeButton from "../Buttons/CancelChangeButton";

export default function EventForm({
                                      formData,
                                      onChange,
                                      handleDelete,
                                      handleSubmit,
                                  }: EventFormType): JSX.Element {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    useEffect(() => {
        const hasInvalidField: boolean = Object.values(formData).some(
            (value) => typeof value === 'string' && (value.trim() === '' || value.length < 3)
        );
        setIsInvalid(hasInvalidField);
    }, [formData]);

    return (
        <article className="detail-view">
            <h1>{formData.id ? 'Update Event' : 'Add Event'}</h1>
            <EventFormInput label="Name" name="name" value={formData.name} onChange={onChange} required />
            <EventFormInput label="Location" name="location" value={formData.location} onChange={onChange} required />
            <EventFormInput label="Date" name="date" type="date" value={formData.date} onChange={onChange} required />
            <EventFormInput label="Time" name="time" type="time" value={formData.time} onChange={onChange} required />
            <EventFormInput label="Link" name="link" value={formData.link} onChange={onChange} required />

            {formData.id && (formData.usersWhoUpvoted || formData.usersWhoDownvoted) && (
                <>
                    <p>Upvotes: {formData.usersWhoUpvoted?.length}</p>
                    <p>Downvotes: {formData.usersWhoDownvoted?.length}</p>
                </>
            )}
            <SaveEventButton isInvalid={isInvalid} handleSaveButton={handleSubmit} />
            {formData.id && <DeleteEventButton handleDeleteButton={handleDelete}/>}
            <CancelChangeButton/>
        </article>
    );
}