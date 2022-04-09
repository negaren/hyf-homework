const TodoListRow = ({ todo, checked, onToggle, onDelete } ) => {
    // destructuring
    return (
        <li>
            <span className={checked ? 'checked' : 'unchecked'}>
            {todo}
            </span>
            
            <input type={'checkbox'} value={checked} onChange={onToggle}></input>
            <button onClick={onDelete} >Delete</button>
        </li>
    )
}

export default TodoListRow