import { EventFormInputType } from '../../resources/types';

export default function EventFormInput({
                                           label,
                                           name,
                                           value,
                                           onChange,
                                           required = false,
                                           type = 'text'
                                       }: EventFormInputType) {
    const isValid: boolean = value.length >= 3;

    return (
        <div>
            <label>
                <input
                    type={type}
                    name={name}
                    value={value}
                    placeholder={label}
                    onChange={onChange}
                    required={required}
                    aria-invalid={!isValid}
                />
            </label>
            <br />
        </div>
    );
}