import React, { useState, useEffect } from 'react';
import './TodoList.css';
import Addbutton from './Addtodolist'
import TodoListRow from './TodoListRow'
import DeleteFromList from './DeleteFromList'
import Counter from './Timer'


const desc = [
    'Random todo1',
    'Random todo2',
    'Random todo3',
    'Random todo4'
]

export const TodoList = ({fetchUrl}) => {

    let [todo, setTodo] = useState([]);

    useEffect(() => {
        addTodo();
    }, []);

    const getTodo = () => {
        return (
            fetch(fetchUrl).then(response => response.json())
        )
    }

    const addTodo = () => {
        return (
            getTodo().then((result) => 
            result.map(item => setTodo((prev) => [...prev, item]))   
        )
        )
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