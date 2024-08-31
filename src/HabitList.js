import React, { useState, useEffect } from 'react';
import { openDB, getAllData, addData, updateData, deleteData } from './indexedDB';

import AddStickyNote from './add-sticky-note';

const DB_NAME = 'HabitTrackerDB';
const STORE_NAME = 'habitLists';

// Custom Hook: useHabitLists
function useHabitLists() {
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

// HabitItem Component
function HabitItem({ habit, onDelete }) {
    return (
        <li>
            {habit}
            <button onClick={onDelete}>Delete</button>
        </li>
    );
}

// ListContainer Component
function ListContainer({ list, onAddHabit, onDeleteHabit, onDeleteList }) {
    const [newHabit, setNewHabit] = useState('');
    const handleAddHabit = () => {
        if (newHabit) {
            onAddHabit(newHabit);
            setNewHabit('');
        }
    };

    return (
        <div className="list-container">
            <h3>{list.name}</h3>
            <button onClick={onDeleteList}>Delete List</button>
            <ul>
                {list.habits.map((habit, habitIndex) => (
                    <HabitItem
                        key={habitIndex}
                        habit={habit}
                        onDelete={() => onDeleteHabit(habitIndex)}
                    />
                ))}
            </ul>
            <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder={`Add a new habit to ${list.name}`}
                onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
            />
            <button onClick={handleAddHabit}>Add Habit</button>
        </div>
    );
}

// Main HabitList Component
function HabitList() {
    const { habitLists, addList, addHabit, deleteHabit, deleteList } = useHabitLists();

    return (
        <div>
            <AddStickyNote onAdd={addList} />

            {habitLists.map((list, index) => (
                <ListContainer
                    key={list.id}
                    list={list}
                    onAddHabit={(habit) => addHabit(index, habit)}
                    onDeleteHabit={(habitIndex) => deleteHabit(index, habitIndex)}
                    onDeleteList={() => deleteList(list.id)}
                />
            ))}
        </div>
    );
}

export default HabitList;