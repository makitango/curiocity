import {EventFormInputType} from "../../resources/types.tsx";

export default function EventFormInput({ label, name, value, onChange, required = false, type = 'text' }: EventFormInputType) {
    return (
        <div>
            <label>
                <span>{label}:</span>
                <input type={type} name={name} value={value} onChange={onChange} required={required} />
            </label>
            <br />
        </div>
    );
}