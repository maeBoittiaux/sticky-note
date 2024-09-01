import React, { useState } from 'react';

function EditNoteModal({ isOpen, onClose, noteTitle, noteColor, onSave, onDelete }) {
    const [title, setTitle] = useState(noteTitle);
    const [color, setColor] = useState(noteColor);

    const handleSave = () => {
        onSave(title, color);
        onClose();
    };

    if (!isOpen) return null;

    const colors = [
        { label: 'Yellow', value: '#fffb7d' },
        { label: 'Red', value: '#ff9a9a' },
        { label: 'Green', value: '#9aff9a' },
        { label: 'Blue', value: '#9ad4ff' },
        { label: 'Pink', value: '#ffb3ff' },
        { label: 'Purple', value: '#c9a9ff' }
    ];

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">Edit Note</div>
                <div className="modal-body">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        maxLength="20"
                    />
                    <div>
                        {colors.map(({ label, value }) => (
                            <button
                                key={value}
                                style={{ backgroundColor: value }}
                                onClick={() => setColor(value)}
                            >
                                {label}
                            </button>
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
