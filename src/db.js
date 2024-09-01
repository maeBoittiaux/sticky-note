import { openDB } from 'idb';

const DB_NAME = 'stickyNoteDB';
const STORE_NAME = 'notes';

const initDB = () => openDB(DB_NAME, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, {
                keyPath: 'id',
                autoIncrement: true,
            });
            store.createIndex('id', 'id', { unique: true });
        }
    },
});

export const getNotes = () => initDB().then(db => db.getAll(STORE_NAME));

export const addNoteToDB = (note) => initDB().then(db => db.add(STORE_NAME, note));

export const updateNoteInDB = (note) => initDB().then(db => db.put(STORE_NAME, note));

export const deleteNoteFromDB = (id) => initDB().then(db => db.delete(STORE_NAME, id));