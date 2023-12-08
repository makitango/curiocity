import { Link } from 'react-router-dom';

export default function CancelChangeButton(): JSX.Element {
    return (
        <Link to="/" style={{ textDecoration: 'none', width: '100%' }}>
            <button type="button" className="outline secondary" style={{ width: '100%' }}>
                Cancel
            </button>
        </Link>
    );
}