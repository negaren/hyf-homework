
const DateInput = ({onchange}) => {
    
    return (
        <div>
            <br/>
            <label>Deadline </label>
            <input type='date' onChange={onchange}>
        </input>
        </div> 
    )
}

export default DateInput

