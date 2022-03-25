import React, { useState } from 'react';
import './TodoList.css';
import Addbutton from './Addtodolist'
import TodoListRow from './TodoListRow'
import DeleteFromList from './DeleteFromList'
import Counter from './Timer'

const todos = [
    {
        id: 1,
        description: "Get out of bed",
        checked: false,
    },
    {
        id: 2,
        description: "Brush teeth",
        checked: false,
    },
    {
        id: 3,
        description: "Eat breakfast",
        checked: false,
    },
];

const desc = [
    'Random todo1',
    'Random todo2',
    'Random todo3',
    'Random todo4'
]

export const TodoList = () => {
    //const [todo, setTodo] = useState(todos)
    let [todo, setTodo] = useState(todos)

    const addTodo = () => {
        const randomIndex = Math.floor(Math.random() * desc.length)
        const nextId = todo.length + 2
        const nextTodo = todo.concat({ description: desc[randomIndex], id: nextId, checked: false })
        setTodo((nextTodo))
    }


    const deleteItem = (id) => {
        var deletedList = [...todo]
        const filteredList = deletedList.filter(item => item.id !== id)
        console.log(filteredList);
        setTodo(filteredList)
        if (filteredList.length === 0) {
            console.log('no item');
             setTodo([])
        }
    }


    const stateChange = (id) => {
        var updatedList = [...todo]
        updatedList.forEach(item => {
            if(item.id === id) {
                item.checked = !item.checked
            }
        })
        setTodo(updatedList) 
    }


    return (
        <div>
            <Counter/>
            <ul>
            {todo.map((item, index) => {
                return ( 
                        <TodoListRow key={item.id} 
                        todo={item.description} 
                        checked={item.checked}  
                        onCheck={() => {stateChange(item.id)}}  
                        onclick={() => {deleteItem(item.id)}} />         
                )
            })}
        </ul>
        <Addbutton addTodo={addTodo}/>
        {todo.length===0 ? <DeleteFromList/> : true}
        </div>
    )
}






