import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { addTaskToDB, getTasksFromDB, updateTaskInDB, deleteTask } from '../../db/Db';
import Task from './Task';
import Field from "../ui/Field.jsx";
import { ReactSortable } from "react-sortablejs";

export default function Body() {
    const [tasks, setTasks] = useState([]);

    const addNewTask = () => {
        const newTask = {
            id: Math.random().toString(36).substr(2, 9),
            completed: false,
            title: "",
            description: "",
            dueDate: '',
            priority: 'low',
            status: 'pending',
            order: 0,
        };
        setTasks((prevTasks) => [newTask, ...prevTasks]);
    };

    const saveTask = async (task) => {
        await addTaskToDB(task);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const savedTasks = await getTasksFromDB();
            const sortedTasks = savedTasks.sort((a, b) => a.order - b.order);
            setTasks(sortedTasks);
        };
        fetchTasks();
    }, []);

    const handleSortTasks = async (newList) => {
        const updatedTasks = newList.filter(task => task.title !== "");

        setTasks(updatedTasks);
        await saveSortedTasks(updatedTasks);
    };

    const saveSortedTasks = async (sortedTasks) => {
        const updates = sortedTasks.map((task, index) =>
            updateTaskInDB({ ...task, order: index })
        );
        await Promise.all(updates);
        const updatedTasks = await getTasksFromDB();
        const newTasks = updatedTasks.sort((a, b) => a.order - b.order);
        setTasks(newTasks);
    };

    const handleDelete = async (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        await deleteTask(taskId);
    }

    const updateTask = async (task) => {
        updateTaskInDB({ ...task, status: 'completed' , completed: true});
    }

    return (
        <div className="bg-gray-900 flex-1 flex flex-col gap-4">
            <div className="w-5/6 max-w-[736px] mt-[-25px] min-w-[300px] mx-auto flex gap-4">
                <Field className="w-max" placeholder={'Search for task...'} />
                <Button onClick={addNewTask} size="medium" type="accent">
                    Add New
                </Button>
            </div>
            <div className="w-5/6 max-w-[736px] min-w-[300px] mx-auto flex flex-col gap-4">
                <ReactSortable
                    list={[...tasks]}
                    setList={handleSortTasks}
                    className="flex flex-col gap-4"
                    handle=".handle"
                >
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} onSave={saveTask} deleteTask={handleDelete} updateTask={updateTask}/>
                    ))}
                </ReactSortable>
            </div>
        </div>
    );
}
