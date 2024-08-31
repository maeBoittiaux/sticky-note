import React, { useState, useEffect } from 'react';

function HabitList() {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const storedHabits = JSON.parse(localStorage.getItem('habits'));
        if (storedHabits) {
            setHabits(storedHabits);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    return (
        <div>
            <h2>Your Habits</h2>
            <ul>
                {habits.map((habit, index) => (
                    <li key={index}>{habit}</li>
                ))}
            </ul>
        </div>
    );
}

export default HabitList;
