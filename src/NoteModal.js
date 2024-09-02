import React, { useState } from 'react';

const colorOptions = ['#fffb7d', '#ff9a9a', '#9aff9a', '#9ad4ff', '#ffb3ff', '#c9a9ff'];

function NoteModal({ addNote, closeModal }) {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState(colorOptions[0]);

    const handleAddClick = () => {
        if (title) {
            addNote(title, color);
            closeModal();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">New Sticky Note</div>
                <div className="modal-body">
                    <input
                        type="text"
                        placeholder="Enter sticky note title ..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='modal-input'
                        maxLength="16"
                    />
                    <div className="color-options">
                        {colorOptions.map((option) => (
                            <div
                                key={option}
                                className={`color-option ${color === option ? 'selected' : ''}`}
                                style={{ backgroundColor: option }}
                                onClick={() => setColor(option)}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={handleAddClick}>Add</button>
                    <button className="modal-button" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default NoteModal;
