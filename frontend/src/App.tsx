import {Routes, Route} from "react-router-dom";
import AddEvent from "./pages/AddEvent";
import MainPage from "./pages/MainPage";
import UpdateEvent from "./pages/UpdateEvent";

export default function App():JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/add" element={<AddEvent/>}/>
            <Route path="/update/:eventId" element={<UpdateEvent />} />
        </Routes>
    );
}