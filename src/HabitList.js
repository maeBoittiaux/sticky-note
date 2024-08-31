import React, { useState, useEffect } from 'react';

function HabitLists() {
    const [habitLists, setHabitLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [currentListIndex, setCurrentListIndex] = useState(null);
    const [newHabit, setNewHabit] = useState('');

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

    const addHabitToList = (index) => {
        if (newHabit) {
            const updatedLists = [...habitLists];
            updatedLists[index].habits.push(newHabit);
            setHabitLists(updatedLists);
            setNewHabit('');
        }
    };

    const deleteHabitFromList = (listIndex, habitIndex) => {
        const updatedLists = [...habitLists];
        updatedLists[listIndex].habits.splice(habitIndex, 1);
        setHabitLists(updatedLists);
    };

    return (
        <div>
            <h2>Your Habit Lists</h2>
            <ul>
                {habitLists.map((list, index) => (
                    <li key={index}>
                        <strong onClick={() => setCurrentListIndex(index)}>{list.name}</strong>
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
