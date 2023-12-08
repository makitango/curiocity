import { useState } from 'react';
import { DeleteButtonStateType, DeleteEventButtonType } from "../../../resources/types.tsx";
import { useNavigate } from "react-router-dom";

export default function DeleteEventButton({ handleDeleteButton }: Readonly<DeleteEventButtonType>): JSX.Element {
    const [deleteButtonState, setDeleteButtonState] = useState<DeleteButtonStateType>('idle');
    const navigate = useNavigate();

    const isDeleteButtonIdle: boolean = deleteButtonState === 'idle';
    const isDeleteButtonDeleting: boolean = deleteButtonState === 'deleting';
    const isDeleteButtonDeleted: boolean = deleteButtonState === 'deleted';

    const handleClick = async (): Promise<void> => {
        setDeleteButtonState('deleting');
        try {
            await handleDeleteButton();
            setTimeout((): void => {
                setDeleteButtonState('deleted');
                setTimeout((): void => {
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
            className={`secondary ${!isDeleteButtonIdle ? 'disabled' : ''} ${
                isDeleteButtonDeleting ? 'deleting' : isDeleteButtonDeleted ? 'deleted' : ''
            }`}
            style={{ width: '100%' }}
            disabled={!isDeleteButtonIdle}
            aria-busy={isDeleteButtonDeleting}
        >
            {isDeleteButtonDeleting ? 'Deleting' : isDeleteButtonDeleted ? 'Deleted' : 'Delete Event'}
        </button>
    );
}