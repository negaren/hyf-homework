import { useState } from "react";

const TodoListRow = ({
  todoDescription,
  todoDate,
  checked,
  onCheck,
  onDelete,
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
              {todoDescription} | {todoDate}
            </span>
          ) : (
            <input type={"text"} value={editInput} onChange={onEdit}></input>
          )}
        </span>
        <input type={"checkbox"} value={checked} onChange={onCheck}></input>
        <button onClick={onDelete}>Delete</button>
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
      </li>
    </>
  );
};

export default TodoListRow;
