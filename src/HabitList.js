import React, { useState, useEffect } from 'react';
import { openDB, getAllData, addData, updateData, deleteData } from './indexedDB';

const DB_NAME = 'HabitTrackerDB';
const STORE_NAME = 'habitLists';

function HabitLists() {
    const [db, setDb] = useState(null);
    const [habitLists, setHabitLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [currentListIndex, setCurrentListIndex] = useState(null);
    const [newHabit, setNewHabit] = useState('');

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

    const addList = () => {
        if (newListName) {
            const newList = { name: newListName, habits: [] };
            addData(db, STORE_NAME, newList).then((id) => {
                newList.id = id;
                setHabitLists([...habitLists, newList]);
                setNewListName('');
            });
        }
    };

    const addHabitToList = (index) => {
        if (newHabit) {
            const updatedLists = [...habitLists];
            updatedLists[index].habits.push(newHabit);

            updateData(db, STORE_NAME, updatedLists[index]).then(() => {
                setHabitLists(updatedLists);
                setNewHabit('');
            });
        }
    };

    const deleteHabitFromList = (listIndex, habitIndex) => {
        const updatedLists = [...habitLists];
        updatedLists[listIndex].habits.splice(habitIndex, 1);

        updateData(db, STORE_NAME, updatedLists[listIndex]).then(() => {
            setHabitLists(updatedLists);
        });
    };

    const deleteList = (listId) => {
        deleteData(db, STORE_NAME, listId).then(() => {
            setHabitLists(habitLists.filter((list) => list.id !== listId));
            setCurrentListIndex(null);
        });
    };

    return (
        <div>
            <h2>Your Habit Lists</h2>
            <ul>
                {habitLists.map((list, index) => (
                    <li key={list.id}>
                        <strong onClick={() => setCurrentListIndex(index)}>{list.name}</strong>
                        <button onClick={() => deleteList(list.id)}>Delete List</button>
                        <ul>
                            {list.habits.map((habit, habitIndex) => (
                                <li key={habitIndex}>
                                    {habit}
                                    <button onClick={() => deleteHabitFromList(index, habitIndex)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        {currentListIndex === index && (
                            <div>
                                <input
                                    type="text"
                                    value={newHabit}
                                    onChange={(e) => setNewHabit(e.target.value)}
                                    placeholder={`Add a new habit to ${list.name}`}
                                />
                                <button onClick={() => addHabitToList(index)}>Add Habit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Enter a new list name"
            />
            <button onClick={addList}>Add List</button>
        </div>
    );
}

export default HabitLists;
