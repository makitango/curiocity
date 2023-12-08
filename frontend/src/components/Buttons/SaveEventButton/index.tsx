import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {SaveButtonStateType, SaveEventButtonType} from "../../../resources/types";



export default function SaveEventButton({ isInvalid, handleSaveButton }: Readonly<SaveEventButtonType>): JSX.Element {
    const [saveButtonState, setSaveButtonState] = useState<SaveButtonStateType>('idle');
    const navigate = useNavigate();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault(); // Prevent the default form submission behavior

        setSaveButtonState('saving');

        try {
            await handleSaveButton(e);

            setTimeout(() => {
                setSaveButtonState('saved');
                setTimeout(() => {
                    setSaveButtonState('idle');
                    navigate("/");
                }, 1500);
            }, 1500);
        } catch (error) {
            console.error('Error during save:', error);
            setSaveButtonState('idle');
        }
    };

    return (
        <button
            type="submit"
            onClick={handleClick}
            className={`save-event-button ${isInvalid || saveButtonState === 'saving' ? 'disabled' : ''} ${
                saveButtonState === 'saved' ? 'saved' : ''
            }`}
            style={{ width: '100%' }}
            disabled={isInvalid || saveButtonState === 'saving' || saveButtonState === 'saved'}
            aria-busy={saveButtonState === 'saving'}
        >
            {saveButtonState === 'saving' ? 'Saving' : saveButtonState === 'saved' ? 'Saved' : 'Save Event'}
        </button>
    );
}