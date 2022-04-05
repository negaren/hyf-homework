import { useState, useEffect } from "react";
import { FancyBorder } from "./FancyBorder";

const TodoListRow = ({
  todo,
  todoDate,
  checked,
  onCheck,
  onclick,
  onEdit,
  editInput,
  updateTodo,
  editTodo,
  inputValue,
}) => {
  const [edit, setEdit] = useState(false);

  return (
     <>
      <li>
        <span className={checked ? "checked" : "unchecked"}>
          {edit === false ? (
            <span>
              {todo} | {todoDate}
            </span>
          ) : (
            <input type={"text"} value={editInput} onChange={onEdit}></input>
          )}
        </span>
        <input type={"checkbox"} value={checked} onChange={onCheck}></input>
        <button onClick={onclick}>Delete</button>
        {/* {useEffect(() => { */}
        <>
          {edit === false ? (
            <button
              onClick={() => {
                setEdit(true);
                editTodo();
              }}
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                setEdit(false);
                updateTodo();
              }}
            >
              Update
            </button>
          )}
        </>
        {/* },[])} */}
      </li>
     </>
  );
};

export default TodoListRow;
