import { useState, useEffect } from 'react';
import { openDB, getAllData, addData, updateData, deleteData } from './indexedDB';

const DB_NAME = 'HabitTrackerDB';
const STORE_NAME = 'habitLists';

export function useHabitLists() {
    const [db, setDb] = useState(null);
    const [habitLists, setHabitLists] = useState([]);

    useEffect(() => {
        openDB(DB_NAME, STORE_NAME).then((db) => {
            setDb(db);
            return getAllData(db, STORE_NAME);
        }).then((data) => {
            setHabitLists(data);
        }).catch((error) => {
            console.error('Failed to open IndexedDB:', error);
        });
    }, []);

    const addList = (newListName) => {
        const newList = { name: newListName, habits: [] };
        return addData(db, STORE_NAME, newList).then((id) => {
            newList.id = id;
            setHabitLists([...habitLists, newList]);
        });
    };

    const addHabit = (listIndex, newHabit) => {
        const updatedLists = [...habitLists];
        updatedLists[listIndex].habits.push(newHabit);
        return updateData(db, STORE_NAME, updatedLists[listIndex]).then(() => {
            setHabitLists(updatedLists);
        });
    };

    const deleteHabit = (listIndex, habitIndex) => {
        const updatedLists = [...habitLists];
        updatedLists[listIndex].habits.splice(habitIndex, 1);
        return updateData(db, STORE_NAME, updatedLists[listIndex]).then(() => {
            setHabitLists(updatedLists);
        });
    };

    const deleteList = (listId) => {
        return deleteData(db, STORE_NAME, listId).then(() => {
            setHabitLists(habitLists.filter((list) => list.id !== listId));
        });
    };

    return {
        habitLists,
        addList,
        addHabit,
        deleteHabit,
        deleteList,
    };
}
