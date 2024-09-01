import React, { useState, useEffect } from 'react';
import { getNotes, addNoteToDB, deleteNoteFromDB } from './db';
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
    setNotes(prevNotes => prevNotes.map(note =>
      note.id === id ? { ...note, title, color } : note
    ));
    setShowEditModal(false);
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