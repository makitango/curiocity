import { useState } from 'react';
import {DeleteButtonStateType, DeleteEventButtonType} from "../../../resources/types.tsx";
import {useNavigate} from "react-router-dom";

export default function DeleteEventButton({ handleDeleteButton }: Readonly<DeleteEventButtonType>): JSX.Element {
    const [deleteButtonState, setDeleteButtonState] = useState<DeleteButtonStateType>('idle');
    const navigate = useNavigate();

    const handleClick = async (): Promise<void> => {
        setDeleteButtonState('deleting');
        try {
            await handleDeleteButton();

            setTimeout(() => {
                setDeleteButtonState('deleted');
                setTimeout(() => {
                    setDeleteButtonState('idle');
                    navigate("/")
                }, 1500);
            }, 1500);
        } catch (error) {
            console.error('Error during delete:', error);
            setDeleteButtonState('idle');
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`secondary ${deleteButtonState !== 'idle' ? 'disabled' : ''} ${
                deleteButtonState === 'deleting' ? 'deleting' : deleteButtonState === 'deleted' ? 'deleted' : ''
            }`}
            style={{ width: '100%' }}
            disabled={deleteButtonState !== 'idle'}
            aria-busy={deleteButtonState === 'deleting'}
        >
            {deleteButtonState === 'deleting' ? 'Deleting...' : deleteButtonState === 'deleted' ? 'Deleted' : 'Delete Event'}
        </button>
    );
}