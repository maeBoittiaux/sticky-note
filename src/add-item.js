import React, { useState } from 'react';

function AddItem({ onAdd, placeholder }) {
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
                className='sticky-note'
            />
            <button
                className='sticky-note'
                onClick={handleAdd}>Add
            </button>
        </div>
    );
}

export default AddItem;
