import { useContext } from 'react';
import { CheckboxContext } from './CheckboxProvider'; // Import the context

const CheckboxComponent = () => {
    // Use the context to get the state and the function to update it
    const { isChecked, setIsChecked } = useContext(CheckboxContext);

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked); // Update the context state
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked} // Bind checkbox to the context state
                    onChange={handleCheckboxChange} // Update state on change
                />
                Check me!
            </label>

            {/* Display the checkbox state */}
            <p>The checkbox is {isChecked ? 'checked' : 'unchecked'}.</p>
        </div>
    );
};

export default CheckboxComponent;
