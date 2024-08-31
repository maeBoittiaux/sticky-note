import React, { useState } from 'react';

function AddItemForm({ onAdd, placeholder }) {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue) {
            onAdd(inputValue);
            setInputValue('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default AddItemForm;
