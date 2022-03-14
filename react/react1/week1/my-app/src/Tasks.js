import './Tasks.css';

const Tasks = [
    {
        description: "Get out of bed",
        deadline_date: 'Wed Sep 13 2017',
    },
    {
        description: "Brush teeth",
        deadline_date: 'Thu Sep 14 2017',
    },
    {
        description: "Eat breakfast",
        deadline_date: 'Fri Sep 15 2017',
    },
];

export function TasksList() {
    return (
        <div class="tasks-main-div">
            {Tasks.map(task => {
                return (
                    <div class="tastks-div">
                        <li>
                            {task.description}, {task.deadline_date}
                        </li>
                    </div>
                )
            })}
        </div>
    );
}