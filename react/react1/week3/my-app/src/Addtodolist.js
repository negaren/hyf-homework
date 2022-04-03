const Addbutton = ({addTodo}) => {
    return (
        <>
        <br/>
        <button onClick={addTodo}>Add new todo</button>
        <label id={`no-item`} ></label>
        </>
    )
}

export default Addbutton