import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {SaveButtonStateType, SaveEventButtonType} from "../../../resources/types";

export default function SaveEventButton({isInvalid, handleSaveButton}: Readonly<SaveEventButtonType>): JSX.Element {
    const [saveButtonState, setSaveButtonState] = useState<SaveButtonStateType>('idle');
    const navigate = useNavigate();

    const isSaveButtonIdle: boolean = saveButtonState === 'idle';
    const isSaveButtonSaving: boolean = saveButtonState === 'saving';
    const isSaveButtonSaved: boolean = saveButtonState === 'saved';

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        setSaveButtonState('saving');
        try {
            await handleSaveButton(e);
            setTimeout((): void => {
                setSaveButtonState('saved');
                setTimeout((): void => {
                    setSaveButtonState('idle');
                    navigate("/");
                }, 1500);
            }, 1500);
        } catch (error) {
            console.error('Error during save:', error);
            setSaveButtonState('idle');
        }
    };

    const buttonClassNames: string = `save-event-button ${isInvalid || !isSaveButtonIdle ? 'disabled' : ''} ${isSaveButtonSaving ? 'saving' : isSaveButtonSaved ? 'saved' : ''}`;

    return (
        <button
            type="submit"
            onClick={handleClick}
            className={buttonClassNames}
            style={{width: '100%'}}
            disabled={isInvalid || isSaveButtonSaving}
            aria-busy={isSaveButtonSaving}
        >
            {isSaveButtonSaving ? 'Saving' : isSaveButtonSaved ? 'Saved' : 'Save Event'}
        </button>
    );
}
