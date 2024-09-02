import React, { useState } from 'react';

function EditNoteModal({ isOpen, onClose, noteTitle, noteColor, onSave, onDelete }) {
    const [title, setTitle] = useState(noteTitle);
    const [color, setColor] = useState(noteColor);

    const handleSave = () => {
        onSave(title, color);
        onClose();
    };

    if (!isOpen) return null;

    const colorOptions = ['#fffb7d', '#ff9a9a', '#9aff9a', '#9ad4ff', '#ffb3ff', '#c9a9ff'];

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">Edit Sticky Note</div>
                <div className="modal-body">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        maxLength="16"
                        className='modal-input'
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
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onDelete}>Delete</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditNoteModal;
