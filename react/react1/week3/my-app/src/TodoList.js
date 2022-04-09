import React, { useState, useEffect } from "react";
import "./TodoList.css";
import TodoListRow from "./TodoListRow";
import EmptyListMessage from "./DeleteFromList";
import TodoDescription from "./TodoDescription";
import Addbutton from "./Addtodolist";
import DateInput from "./DateInput";
import { FancyBorder } from "./FancyBorder";

export const TodoList = ({ fetchUrl }) => {
  const [todos, setTodos] = useState([]);
  const [helpTodo, setHelpTodo] = useState([]);
  const [todoDesc, setTodoDesc] = useState("");

  useEffect( () => {
    getTodo();
  }, []);

  const getTodo = async () => {
    await fetch(fetchUrl)
      .then((response) => response.json())
      .then((result) => {
        setTodos(result);
      });
  };

  const deleteItems = (id) => {
    var todosSapreArr = [...todos];
    const filteredList = todosSapreArr.filter((item) => item.id !== id);
    setTodos(filteredList);
    if (filteredList.length === 0) {
      setTodos([]);
    }
  };

  const stateChange = (id) => {
    var todosSapreArr = [...todos];
    todosSapreArr.forEach((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
    });
    setTodos(todosSapreArr);
  };

  const addTodo = () => {
    const nextId = todos[todos.length-1].id + 1;
    setTodos([...todos, { ...helpTodo, id: nextId }]);
    console.log(todos);
  };
  const onTextChange = (event) => {
    setHelpTodo({ ...helpTodo, description: event.target.value });
    console.log(helpTodo);
  };

  const onDateChange = (event) => {
    setHelpTodo({ ...helpTodo, deadline: event.target.value });
    console.log(helpTodo);
  };

  const onEditChange = (event) => {
    setTodoDesc(event.target.value);
  };

  const editTodo = (id) => {
    todos.map((item) => {
      if (item.id == id) {
        setTodoDesc(item.description);
      }
    });
  };


    const updateTodo = (id) => {
      const index = todos.findIndex((object) => {
        return object.id === id;
      });
      let todoSpareArr = [...todos]
      todoSpareArr[index].description = todoDesc;
      setTodos(todoSpareArr);
    };

  

  return (
    <div>
      <TodoDescription onchange={onTextChange} />
      <br />
      <DateInput onchange={onDateChange} />
      <br />
      <Addbutton addTodo={addTodo} />
      <ul>
        {todos.map((item) => {
          return (
            <FancyBorder key={item.id}>
              <TodoListRow
                key={item.id}
                todoDescription={item.description}
                todoDate={item.deadline}
                checked={item.checked}
                onCheck={() => {
                  stateChange(item.id);
                }}
                onDelete={() => {
                  deleteItems(item.id);
                }}
                onEdit={onEditChange}
                editInput={todoDesc}
                updateTodo={()=>updateTodo(item.id)}
                editTodo={() => {
                  editTodo(item.id);
                }}
              />
            </FancyBorder>
          );
        })}
      </ul>
      {todos.length === 0 ? <EmptyListMessage /> : true}
    </div>
  );
};
