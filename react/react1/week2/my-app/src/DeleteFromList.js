const EmptyTodoList = ({deleteItem}) => {
    return (
        <span deleteItem={deleteItem} >
            No more items to show
        </span>
    )
}

export default EmptyTodoList 