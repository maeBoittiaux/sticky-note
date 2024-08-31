import React, { useState, useEffect } from 'react';

function HabitLists() {
    const [habitLists, setHabitLists] = useState([]);
    const [newListName, setNewListName] = useState('');

    useEffect(() => {
        const storedHabitLists = JSON.parse(localStorage.getItem('habitLists'));
        if (storedHabitLists) {
            setHabitLists(storedHabitLists);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('habitLists', JSON.stringify(habitLists));
    }, [habitLists]);

    const addList = () => {
        if (newListName) {
            setHabitLists([...habitLists, { name: newListName, habits: [] }]);
            setNewListName('');
        }
    };

    return (
        <div>
            <h2>Your Habit Lists</h2>
            <ul>
                {habitLists.map((list, index) => (
                    <li key={index}>
                        {list.name} ({list.habits.length} habits)
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
