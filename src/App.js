import React, { useState, useEffect } from 'react';
import { getNotes, addNoteToDB, updateNoteInDB, deleteNoteFromDB } from './db';
import NoteModal from './NoteModal';
import StickyNote from './StickyNote';
import EditNoteModal from './EditNoteModal';

function App() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const storedNotes = await getNotes();
      setNotes(storedNotes);
    };
    fetchNotes();
  }, []);

  const addNote = async (title, color) => {
    const newNote = { title, color, items: [] };
    const id = await addNoteToDB(newNote);
    setNotes(prevNotes => [...prevNotes, { ...newNote, id }]);
  };

  const updateNote = async (updatedNote) => {
    await updateNoteInDB(updatedNote);
    setNotes(prevNotes => prevNotes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const deleteNote = async (id) => {
    await deleteNoteFromDB(id);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));

    if (currentNote?.id === id) {
      setShowEditModal(false);
      setCurrentNote(null);
    }
  };

  const handleEditNote = (id, title, color) => {
    setCurrentNote({ id, title, color });
    setShowEditModal(true);
  };

  const handleSaveNote = async (id, title, color) => {
    const updatedNote = notes.find(note => note.id === id);
    updatedNote.title = title;
    updatedNote.color = color;
    await updateNoteInDB(updatedNote);
    setNotes(prevNotes => prevNotes.map(note =>
      note.id === id ? updatedNote : note
    ));
    setShowEditModal(false);
  };

  const handleAddItem = async (noteId, newItem) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        const updatedItems = [...note.items, newItem];
        const updatedNote = { ...note, items: updatedItems };
        updateNoteInDB(updatedNote);
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleDeleteItem = async (noteId, itemIndex) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        const updatedItems = note.items.filter((_, index) => index !== itemIndex);
        const updatedNote = { ...note, items: updatedItems };
        updateNoteInDB(updatedNote);
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <button className="add-note-button" onClick={() => setShowModal(true)}>+</button>
      </div>
      <div className="sticky-notes-grid">
        {notes.map(note => (
          <StickyNote
            key={note.id}
            id={note.id}
            title={note.title}
            color={note.color}
            items={note.items}
            onDelete={deleteNote}
            onEdit={handleEditNote}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
      {showModal && <NoteModal addNote={addNote} closeModal={() => setShowModal(false)} />}
      {showEditModal && currentNote && (
        <EditNoteModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          noteTitle={currentNote.title}
          noteColor={currentNote.color}
          onSave={(title, color) => handleSaveNote(currentNote.id, title, color)}
          onDelete={() => deleteNote(currentNote.id)}
        />
      )}
    </div>
  );
}

export default App;
