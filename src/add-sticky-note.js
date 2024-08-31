import React, { useState } from 'react';

function AddStickyNote({ onAdd }) {
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
                placeholder="Enter sticky note name ..."
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button onClick={handleAdd}>Add List</button>
        </div>
    );
}

export default AddStickyNote;
