import React, { useState } from 'react';
import './TodoList.css';
import Addbutton from './Addtodolist'
import TodoListRow from './TodoListRow'
import EmptyTodoList from './DeleteFromList'

const todosInitiaArr = [
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
    let [todos, setTodos] = useState(todosInitiaArr)

    const addTodo = () => {
        const randomIndex = Math.floor(Math.random() * desc.length)
        const nextId = todos[todos.length-1].id + 1
        const nextTodos = todos.concat({ description: desc[randomIndex], id: nextId, checked: false })
        setTodos((nextTodos))
    }


    const deleteItem = (id) => {
        var todoSpareArr = [...todos]
        const filteredList = todoSpareArr.filter(item => item.id !== id)
        setTodos(filteredList)
        if (filteredList.length === 0) {
            console.log('no item');
             setTodos([])
        }
    }


    const toggleTodo = (id) => {
        var updatedList = [...todos]
        updatedList.map(item => {
            if(item.id === id) {
               return item.checked = !item.checked
            }
        })
        setTodos(updatedList) 
    }


    return (
        <div>
            <ul>
            {todos.map((item, index) => {
                return ( 
                        <TodoListRow key={item.id} 
                        todo={item.description} 
                        checked={item.checked}  
                        onToggle={() => {toggleTodo(item.id)}}  
                        onDelete={() => {deleteItem(item.id)}} />         
                )
            })}
        </ul>
        <Addbutton addTodo={addTodo}/>
        {todos.length===0 ? <EmptyTodoList/> : true}
        </div>
    )
}






