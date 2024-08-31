import React from 'react';
import { useHabitLists } from './useHabitLists';
import ListContainer from './ListContainer';
import AddItemForm from './AddItemForm';

function HabitList() {
    const { habitLists, addList, addHabit, deleteHabit, deleteList } = useHabitLists();

    return (
        <div>
            <AddItemForm onAdd={addList} placeholder="Enter a new list name" />

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