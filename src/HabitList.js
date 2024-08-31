import React, { useState } from 'react';

function HabitList() {
    const [habits, setHabits] = useState([]);

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
