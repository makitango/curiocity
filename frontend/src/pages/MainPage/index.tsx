import {Link} from "react-router-dom";

export default function MainPage() {
    return (
        <>
            <Link to="add">Add Event</Link>
            <h1>MainPage</h1>
            <div>
                <p>Imagine MainPage content</p>
            </div>
        </>
    );
}