import React, { useState, useEffect } from 'react';
import './TodoList.css';
import TodoListRow from './TodoListRow'
import DeleteFromList from './DeleteFromList'
import Counter from './Timer'
import TodoDescription from "./TodoDescription";
import Addbutton from './Addtodolist'
import DateInput from "./DateInput";
import { FancyBorder } from './FancyBorder';




export const TodoList = ({ fetchUrl }) => {

    const [todo, setTodo] = useState([{}])
    const [helpTodo, setHelpTodo] = useState([])
    const [todoDesc, setTodoDesc] = useState('')

    useEffect(() => {
        getTodo()
    }, []);
  


    const getTodo = () => {

            fetch(fetchUrl).then(response => response.json())
            .then((result) => {
                setTodo(result)
               
            })
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
        setTodo([...todo,{...helpTodo, id : nextId}])
    }
    const onTextChange = (event) => {
        setHelpTodo({...helpTodo, description : event.target.value});
        console.log(helpTodo);
    }

    const onDateChange = (event) => {
        setHelpTodo({...helpTodo, deadline : event.target.value});
        console.log(helpTodo);
    }


    const onEditChange = (event) => {
        setTodoDesc(event.target.value);
    }

    const editTodo = (id) => {
        todo.map(item => {
            if (item.id == id) {
                setTodoDesc(item.description);
            }
        })
    }

    const updateTodo = (id) => {
        const index = todo.findIndex(object => {
            return object.id ===id
        })
        todo[index].description = todoDesc;
        setTodo(todo)
console.log(todo);
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
                    // console.log(item);
                    return (
                        <FancyBorder>
                        <TodoListRow key={item.id}
                            todo={item.description}
                            todoDate={item.deadline}
                            checked={item.checked}
                            onCheck={() => { stateChange(item.id) }}
                            onclick={() => { deleteItems(item.id) }}
                            onEdit={onEditChange}
                            editInput={todoDesc}
                            updateTodo={() => { updateTodo(item.id) }}
                            editTodo={() => { editTodo(item.id) }}
                        />
                        </FancyBorder>
                    )
                    })}
            </ul>
            {todo.length === 0 ? <DeleteFromList /> : true}
        </div>
    )
}