import React, { useState, useEffect } from 'react';
import { openDB, getAllData, addData, updateData, deleteData } from './indexedDB';
import AddStickyNote from './add-sticky-note';
import AddItem from './add-item';

const DB_NAME = 'StickyNoteDB';
const STORE_NAME = 'stickyNotes';

function useStickyNotes() {
    const [db, setDb] = useState(null);
    const [stickyNotes, setStickyNotes] = useState([]);

    useEffect(() => {
        openDB(DB_NAME, STORE_NAME).then((db) => {
            setDb(db);
            return getAllData(db, STORE_NAME);
        }).then((data) => {
            setStickyNotes(data);
        }).catch((error) => {
            console.error('Failed to open IndexedDB:', error);
        });
    }, []);

    const addStickyNote = (newNoteTitle) => {
        const newStickyNote = { name: newNoteTitle, items: [] };
        return addData(db, STORE_NAME, newStickyNote).then((id) => {
            newStickyNote.id = id;
            setStickyNotes([...stickyNotes, newStickyNote]);
        });
    };

    const addItem = (noteIndex, newItem) => {
        const updatedNotes = [...stickyNotes];
        updatedNotes[noteIndex].items.push(newItem);
        return updateData(db, STORE_NAME, updatedNotes[noteIndex]).then(() => {
            setStickyNotes(updatedNotes);
        });
    };

    const deleteItem = (noteIndex, itemIndex) => {
        const updatedNotes = [...stickyNotes];
        updatedNotes[noteIndex].items.splice(itemIndex, 1);
        return updateData(db, STORE_NAME, updatedNotes[noteIndex]).then(() => {
            setStickyNotes(updatedNotes);
        });
    };

    const deleteStickyNote = (noteId) => {
        return deleteData(db, STORE_NAME, noteId).then(() => {
            setStickyNotes(stickyNotes.filter((note) => note.id !== noteId));
        });
    };

    return {
        stickyNotes,
        addStickyNote,
        addItem,
        deleteItem,
        deleteStickyNote,
    };
}

function StickyNoteItem({ item, onDelete }) {
    return (
        <li>
            {item}
            <button onClick={onDelete}>Delete</button>
        </li>
    );
}

function StickyNoteContainer({ note, onAddItem, onDeleteItem, onDeleteNote }) {
    return (
        <div className="note-container">
            <h3>{note.name}</h3>
            <button onClick={onDeleteNote}>Delete Note</button>
            <ul>
                {note.items.map((item, itemIndex) => (
                    <StickyNoteItem
                        key={itemIndex}
                        item={item}
                        onDelete={() => onDeleteItem(itemIndex)}
                    />
                ))}
            </ul>
            <AddItem
                onAdd={onAddItem}
                placeholder={`Add new item to ${note.name} ...`}
            />
        </div>
    );
}

function StickyNote() {
    const { stickyNotes, addStickyNote, addItem, deleteItem, deleteStickyNote } = useStickyNotes();

    return (
        <div>
            <AddStickyNote onAdd={addStickyNote} />

            {stickyNotes.map((note, index) => (
                <StickyNoteContainer
                    key={note.id}
                    note={note}
                    onAddItem={(item) => addItem(index, item)}
                    onDeleteItem={(itemIndex) => deleteItem(index, itemIndex)}
                    onDeleteNote={() => deleteStickyNote(note.id)}
                />
            ))}
        </div>
    );
}

export default StickyNote;