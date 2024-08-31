import React, { useState } from 'react';
import HabitItem from './HabitItem';

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

export default ListContainer;