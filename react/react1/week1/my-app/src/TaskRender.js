import './Tasks.css';

const TaskRender = ({description, deadline_date}) => {
        return (
            <>
            <div class="tastks-div">
                <li>
                    {description}, {deadline_date}
                </li>
            </div>
            </>  
        )
}

export default TaskRender