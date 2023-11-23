import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import MainPage from "./pages/MainPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}>
                <Route path="/add" element={<Add/>}/>
            </Route>
        </Routes>
    );
}