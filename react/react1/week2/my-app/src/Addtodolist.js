
const Addbutton = ({addTodo}) => {
    return (
        <>
        <button onClick={addTodo}>Add new todo</button>
        <label id={`no-item`} ></label>
        </>
    )
}

export default Addbutton