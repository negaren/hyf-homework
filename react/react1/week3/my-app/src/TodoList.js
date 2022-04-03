import React, { useState, useEffect } from 'react';
import './TodoList.css';
import TodoListRow from './TodoListRow'
import DeleteFromList from './DeleteFromList'
import Counter from './Timer'
import TodoDescription from "./TodoDescription";
import Addbutton from './Addtodolist'
import DateInput from "./DateInput";
import EditTask from "./EditTask";


const desc = [
    'Random todo1',
    'Random todo2',
    'Random todo3',
    'Random todo4'
]

let todoArrEdit = [];

export const TodoList = ({ fetchUrl }) => {

    const [todo, setTodo] = useState([])
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [edit, setEdit] = useState([])
    const [editInput, setEditInput] = useState('')
    const [buttonValue, setButtonValue] = useState('Edit')

    useEffect(() => {
        existingTodo();
    }, []);


    const getTodo = () => {
        return (
            fetch(fetchUrl).then(response => response.json())
        )
    }

    const existingTodo = () => {
        return (
            getTodo().then((result) => {
                const fetchItems = result.map(item => {
                    const nextTodo = { ...item, 'edit': false }
                    setTodo((prev) => [...prev, nextTodo])
                })
            }
            )
        )
    }


    const deleteItems = (id) => {
        var deletedList = [...todo]
        const filteredList = deletedList.filter(item => item.id !== id)
        setTodo(filteredList)
        if (filteredList.length === 0) {
            setTodo([])
        }
    }

    const stateChange = (id) => {
        var updatedList = [...todo]
        updatedList.forEach(item => {
            if (item.id === id) {
                item.checked = !item.checked
            }
        })
        setTodo(updatedList)
    }

    const addTodo = () => {
        const nextId = todo.length + 2
        const nextTodo = [...todo, { 'description': text, 'id': nextId, 'checked': false, 'deadline': date }]
        setTodo(nextTodo)
        //console.log(nextTodo); //is it a bug that it is not been added at the same time to todo array?
    }
    const onTextChange = (event) => {
        setText(event.target.value);
    }

    const onDateChange = (event) => {
        setDate(event.target.value);
    }

    const editTodo = (id) => {
        var editList = [...todo]
        editList.map(item => {
            if (item.id == id) {
                const nextTodo = { ...item, 'edit': true }
                edit.push(nextTodo)
                setEditInput(item.description)
            }
            else {
                const nextTodo = { ...item, 'edit': false }
                edit.push(nextTodo)
            }
        })
        setTodo(edit)
    }

    const onEditChange = (event) => {
        setEditInput(event.target.value);
    }


    return (
        <div>
            <Counter />
            <TodoDescription onchange={onTextChange} />
            <br />
            <DateInput onchange={onDateChange} />
            <br />
            <Addbutton addTodo={addTodo} />
            <ul>
                {todo.map((item) => {

                    return (

                        <TodoListRow key={item.id}
                            todo={item.description}
                            edit={item.edit}
                            todoDate={item.deadline}
                            checked={item.checked}
                            onCheck={() => { stateChange(item.id) }}
                            onclick={() => { deleteItems(item.id) }}
                            editTodo={() => editTodo(item.id)}
                            onEdit={onEditChange}
                            editInput={editInput}
                        />
                    )
                })}
            </ul>
            {todo.length === 0 ? <DeleteFromList /> : true}
        </div>
    )
}