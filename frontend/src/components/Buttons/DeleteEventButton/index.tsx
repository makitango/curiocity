import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {DeleteButtonStateType, DeleteEventButtonType} from '../../../resources/types.tsx';

export default function DeleteEventButton({handleDeleteButton}: Readonly<DeleteEventButtonType>): JSX.Element {
    const [deleteButtonState, setDeleteButtonState] = useState<DeleteButtonStateType>('idle');
    const navigate = useNavigate();

    const handleClick = async (): Promise<void> => {
        setDeleteButtonState('deleting');
        try {
            await handleDeleteButton();
            setTimeout((): void => {
                setDeleteButtonState('deleted');
                setTimeout((): void => {
                    setDeleteButtonState('idle');
                    navigate('/');
                }, 1500);
            }, 1500);
        } catch (error) {
            console.error('Error during delete:', error);
            setDeleteButtonState('idle');
        }
    };

    const buttonClassNames = `secondary ${deleteButtonState}`;

    return (
        <button
            type="button"
            onClick={handleClick}
            className={buttonClassNames}
            style={{width: '100%'}}
            disabled={deleteButtonState !== 'idle'}
            aria-busy={deleteButtonState === 'deleting'}
        >
            {deleteButtonState === 'deleting' && 'Deleting'}
            {deleteButtonState === 'deleted' && 'Deleted'}
            {deleteButtonState === 'idle' && 'Delete Event'}
        </button>
    );
}