import {useState, ChangeEvent, FormEvent, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AddEventType} from "../../resources/types.tsx";

export default function AddEvent(): JSX.Element {
    const initialFormData: AddEventType = {
        name: "",
        location: "",
        date: "",
        time: "",
        link: "",
        usersWhoUpvoted: [],
        usersWhoDownvoted: [],
    };

    const [formData, setFormData] = useState<AddEventType>(initialFormData);
    const [eventCreated, setEventCreated] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        axios
            .post("/api/events", formData)
            .then((response): void => {
                console.log("Event added successfully:", response.data);
                setEventCreated(true);
                setFormData(initialFormData);
            })
            .catch((error): void => {
                console.error("Error adding event:", error);
            });
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (eventCreated) {
            timer = setTimeout(() => {
                setEventCreated(false);
            }, 5000); // 5000 milliseconds = 5 seconds
        }

        return () => clearTimeout(timer);
    }, [eventCreated]);

    return (
        <>
            <Link to="/">MainPage</Link>
            <h1>Add Event</h1>
            {eventCreated && <p>Event created</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Date:
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Time:
                    <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Link:
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <button type="submit">Add Event</button>
            </form>
        </>
    );
}