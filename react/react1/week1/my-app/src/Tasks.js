import './Tasks.css';
import TaskRender from './TaskRender';

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
        Tasks.map(item => {
            return (
                <>
                   <TaskRender description={item.description} deadline_date={item.deadline_date} />
                </>
            )
        })
    );
}