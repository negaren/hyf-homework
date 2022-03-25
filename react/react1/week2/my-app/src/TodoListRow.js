const TodoListRow = ({ todo, checked, onCheck, onclick } ) => {
    // destructuring
    return (
        <li>
            <span className={checked ? 'checked' : 'unchecked'}>
            {todo}
            </span>
            
            <input type={'checkbox'} value={checked} onChange={onCheck}></input>
            <button onClick={onclick} >Delete</button>
        </li>
    )
}

export default TodoListRow