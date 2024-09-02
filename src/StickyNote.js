import React, { useState } from 'react';

function StickyNote({ id, title, color, items = [], onDelete, onEdit }) {
    const [itemList, setItemList] = useState(items);
    const [newItem, setNewItem] = useState('');

    const darkerColor = {
        '#fffb7d': '#e1d255',
        '#ff9a9a': '#e17878',
        '#9aff9a': '#78e178',
        '#9ad4ff': '#78aee1',
        '#ffb3ff': '#e178e1',
        '#c9a9ff': '#a78bdb',
    }[color] || '#000';

    const handleAddItem = () => {
        if (newItem.trim()) {
            setItemList(prevItems => [...prevItems, newItem]);
            setNewItem('');
        }
    };

    const handleDeleteItem = (index) => {
        setItemList(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAddItem();
    };

    return (
        <div className="sticky-note" style={{ backgroundColor: darkerColor, borderColor: darkerColor }}>
            <div className="sticky-note-top" style={{ backgroundColor: color }}>
                <div className="sticky-note-title">{title}</div>
                <button className="edit-note-button" onClick={() => onEdit(id, title, color)}>✎</button>
            </div>
            <ul className="items-list">
                {itemList.map((item, index) => (
                    <li key={index} className="item">
                        {item}
                        <button className="delete-item-button" onClick={() => handleDeleteItem(index)}>x</button>
                    </li>
                ))}
            </ul>
            {itemList.length < 8 && (
                <div className="add-item-section">
                    <input
                        type="text"
                        className="add-item-input"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add new item"
                        maxLength="20"
                    />
                    <button className="add-item-button" onClick={handleAddItem}>Add</button>
                </div>
            )}
        </div>
    );
}

export default StickyNote;
