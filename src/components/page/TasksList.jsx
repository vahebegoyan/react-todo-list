import Task from "./Task.jsx";
import {useState} from "react";
import { ReactSortable } from "react-sortablejs";

export default function TasksList( {  } ) {
    const [tasks, setTasks] = useState([
        {
            id: 'PU5Cg5VR1v8m7',
            completed: false,
            title: "Integer urna interdum massa libero.",
            description: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
        },
        {
            id: 'fuda1GIfu1eaA',
            completed: false,
            title: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
            description: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
        },
        {
            id: 'Tm9bX7yH1pnzY',
            completed: false,
            title: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
            description: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
        },
        {
            id: 'UUnJfEUkfx107',
            completed: true,
            title: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
            description: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
        },
        {
            id: '7JFABL8QhV22A',
            completed: true,
            title: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
            description: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
        }
    ]);

    return <div className='tasks-list flex flex-col gap-4'>
        <div className="flex items-center justify-between">
            <span className="text-cyan-500 font-medium text-md flex items-center gap-1">
                Pending
                <span className="count bg-gray-800 px-2 flex justify-center items-center rounded-full text-gray-300 text-sm">
                    5
                </span>
            </span>

            <span className="text-indigo-500 font-medium text-md flex items-center gap-1">
                Completed
                <span className="count bg-gray-800 px-2 flex justify-center items-center rounded-full text-gray-300 text-sm">
                    2 of 5
                </span>
            </span>
        </div>
        <ReactSortable list={tasks} setList={setTasks} className="flex flex-col gap-4" handle={'handle'}>
            {tasks.map((task) => (
                <Task task={task} key={task.id}></Task>
            ))}
        </ReactSortable>
    </div>
}