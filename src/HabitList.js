import React, { useState, useEffect } from 'react';

function HabitList() {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');

    useEffect(() => {
        const storedHabits = JSON.parse(localStorage.getItem('habits'));
        if (storedHabits) {
            setHabits(storedHabits);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    const addHabit = () => {
        if (newHabit) {
            setHabits([...habits, newHabit]);
            setNewHabit('');
        }
    };

    return (
        <div>
            <h2>Your Habits</h2>
            <ul>
                {habits.map((habit, index) => (
                    <li key={index}>{habit}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter a new habit"
            />
            <button onClick={addHabit}>Add Habit</button>
        </div>
    );
}

export default HabitList;
