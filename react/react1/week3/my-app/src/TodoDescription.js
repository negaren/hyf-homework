
const TodoDescription = ({onchange}) => {
    
    return (
        <div>
            <br/>
            <label>Task description </label>
            <input type='text' onChange={onchange}>
        </input>
        </div> 
    )
}

export default TodoDescription

