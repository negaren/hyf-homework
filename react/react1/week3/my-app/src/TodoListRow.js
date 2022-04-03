import { number } from "prop-types";
import EditTask from "./EditTask";

const TodoListRow = ({ todo, todoDate, checked, onCheck, onclick, 
    editTodo, edit, onEdit, editInput, updateTodo }) => {

        return (
            <li>
                {/* {console.log(edit)} */}
                <span className={checked ? 'checked' : 'unchecked'}>
                    {edit === false ? <span>{todo} | {todoDate}</span> : 
                     <input type={'text'} value={editInput} onChange={onEdit}></input>}
                    {/* <span>{todo} | {todoDate}</span> */}
                </span>
                <input type={'checkbox'} value={checked} onChange={onCheck}></input>
                <button onClick={onclick} >Delete</button>
                {edit === false ? <button onClick={() => { editTodo() }}>Edit</button> : 
                <button onClick={() => { updateTodo() }}>Update</button>}
                
            </li>
        )
    }

export default TodoListRow