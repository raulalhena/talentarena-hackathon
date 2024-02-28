import './DateInput.css';
const DateInput = ({ value, handleChange }) => {

    return (
        <div data-testid="date-input" className="">
            <input
                className=""
                type="date"
                id="startedAt"
                name="startedAt"
                value={value}
                onChange={handleChange}
                placeholder='Start Date'
            />
        </div>
    );
};

export default DateInput;