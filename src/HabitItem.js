import React from 'react';

function HabitItem({ habit, onDelete }) {
  return (
    <li>
      {habit}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default HabitItem;