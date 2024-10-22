import { useRef, useState, useEffect } from "react";
import gsap from 'gsap';
import Button from '../ui/Button';
import Field from "../ui/Field.jsx";

export default function Task({ task, autoExpand, onSave, updateTask, deleteTask }) {
    const [expanded, setExpanded] = useState(autoExpand);
    const [editedTask, setEditedTask] = useState({ ...task });
    const bodyRef = useRef(null);
    const animationRef = useRef(null);
    const expanderRef = useRef(null);
    const [animating, setAnimating] = useState(false);
    const [priority, setPriority] = useState(task.priority || '');
    const [status, setStatus] = useState(task.status || '');

    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
    ];
    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
    ];

    useEffect(() => {
        if (autoExpand) {
            expand();
        }
    }, [autoExpand]);

    const expand = () => {
        if (bodyRef.current && !animationRef.current) {
            if (!expanded) {
                setAnimating(true);
                gsap.to(expanderRef.current, {
                    duration: .25,
                    rotate: 90,
                    ease: "power1.inOut",
                });
                animationRef.current = gsap.to(bodyRef.current, {
                    duration: .25,
                    height: 'auto',
                    ease: "power1.inOut",
                    onComplete: () => {
                        animationRef.current = null;
                        setExpanded(true);
                        setAnimating(false);
                    }
                });
            } else {
                gsap.to(expanderRef.current, {
                    duration: .25,
                    rotate: 0,
                    ease: "power1.inOut",
                });
                animationRef.current = gsap.to(bodyRef.current, {
                    duration: .25,
                    height: 0,
                    ease: "power1.inOut",
                    onComplete: () => {
                        animationRef.current = null;
                        setExpanded(false);
                        setAnimating(false);
                    }
                });
            }
        }
    };

    const handleDelete = () => {
        deleteTask(task.id)
    };

    const handleTitleChange = (e) => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            title: e.target.value
        }));
    };

    const handleDescriptionChange = (e) => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            description: e.target.value
        }));
    };

    const handleDueDateChange = (e) => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            dueDate: e.target.value
        }));
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
        setEditedTask((prevTask) => ({
            ...prevTask,
            priority: e.target.value
        }));
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setEditedTask((prevTask) => ({
            ...prevTask,
            status: e.target.value
        }));
    };

    const saveEditedTask = () => {
        onSave({ ...editedTask, priority, status });
    };

    const changeTaskStatus = () => {
        setStatus('completed');
        updateTask(task);
    }

    return (
        <div
            className={
                "group/task flex flex-col bg-gray-800 p-4 rounded-md border border-gray-700 transition-all" +
                (task.completed ? " opacity-70" : "")
            }
        >
            {/* Task Header */}
            <div className="flex items-start gap-3">
                <span className="mt-[4px] handle cursor-grab">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover/task:fill-gray-300 group-hover/task:w-[8px] fill-transparent transition-all w-0 h-auto"
                        width="8"
                        viewBox="0 0 256 512"
                    >
                        <path d="M64 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm0 160a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM96 416a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96-288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32 128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM192 448a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                    </svg>
                </span>
                <span
                    className={
                        "mt-[4px] checkbox p-1 rounded-full border aspect-square w-auto flex " +
                        (task.completed ? "bg-indigo-500 border-indigo-500" : "bg-transparent border-cyan-500")
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={task.completed ? "fill-gray-300" : "fill-transparent"}
                        width="8"
                        viewBox="0 0 448 512"
                        onClick={changeTaskStatus}
                    >
                        <path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z" />
                    </svg>
                </span>
                <span className="title text-gray-300">
                    {task.title.substring(0, 77) + (task.title.length > 77 ? '...' : '')}
                </span>
                <span className="delete flex p-1 group/delete cursor-pointer ml-auto">
                    <svg
                        onClick={handleDelete}
                        width="13"
                        height="14"
                        className="group-hover/delete:fill-red-500 transition-all fill-gray-600"
                        viewBox="0 0 13 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M8.20214 4.98547H6.87158V10.5073H8.20214V4.98547Z M5.46239 4.98547H4.13184V10.5073H5.46239V4.98547Z M12.478 2.16712C12.4754 2.03061 12.4295 1.89846 12.3469 1.78975C12.2642 1.68104 12.1492 1.6014 12.0184 1.56232V1.56232C11.9596 1.53782 11.8974 1.52252 11.8339 1.51696H8.28678C8.1525 1.07791 7.88082 0.693554 7.51174 0.420471C7.14265 0.147388 6.69564 0 6.23651 0C5.77738 0 5.33038 0.147388 4.96129 0.420471C4.5922 0.693554 4.32053 1.07791 4.18625 1.51696H0.639107C0.580679 1.51814 0.522687 1.52729 0.46674 1.54418H0.45162C0.313182 1.58701 0.193338 1.67547 0.11163 1.79515C0.0299214 1.91483 -0.00883041 2.05866 0.00169348 2.20319C0.0122174 2.34771 0.071396 2.48441 0.169579 2.59099C0.267763 2.69757 0.399158 2.76774 0.542339 2.79006L1.25298 12.5334C1.26382 12.9127 1.41693 13.2741 1.68191 13.5458C1.94688 13.8175 2.30435 13.9797 2.68332 14H9.78668C10.1662 13.9804 10.5244 13.8186 10.79 13.5468C11.0556 13.2751 11.2092 12.9132 11.22 12.5334L11.9277 2.79914C12.0802 2.77797 12.22 2.70232 12.3212 2.58615C12.4223 2.46999 12.478 2.32116 12.478 2.16712V2.16712ZM6.23651 1.21456C6.3661 1.21458 6.49427 1.24146 6.61294 1.29351C6.73161 1.34556 6.8382 1.42164 6.92598 1.51696H5.54704C5.63459 1.42135 5.74114 1.34507 5.85986 1.29299C5.97859 1.24092 6.10687 1.21421 6.23651 1.21456V1.21456ZM9.78668 12.7904H2.68332C2.60168 12.7904 2.47467 12.6573 2.45955 12.4457L1.75798 2.81123H10.715L10.0135 12.4457C9.99836 12.6573 9.87135 12.7904 9.78668 12.7904Z" />
                    </svg>
                </span>
                <span className="expand flex p-1 cursor-pointer group/expand" ref={expanderRef} onClick={expand}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={"group-hover/expand:fill-gray-300 transition-all " + (expanded || animating ? "fill-gray-300" : "fill-gray-600")}
                        width="13"
                        viewBox="0 0 448 512"
                    >
                        <path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z" />
                    </svg>
                </span>
            </div>
            {/* End Task Header */}

            {/* Task body */}
            <div className="overflow-hidden" ref={bodyRef} style={{ height: 0 }}>
                <div className="flex gap-4 flex-col pt-4 border-t border-gray-700 mt-4">
                    <Field
                        type="text"
                        id="taskTitle"
                        value={editedTask.title}
                        placeholder="Task Title"
                        onChange={handleTitleChange}
                        label="Title"
                        required={true}
                    />
                    <Field
                        type="textarea"
                        id="taskDescription"
                        value={editedTask.description}
                        placeholder="Task Description"
                        onChange={handleDescriptionChange}
                        label="Description"
                        required={true}
                    />
                    <Field
                        type="date"
                        id="taskDueDate"
                        value={editedTask.dueDate}
                        placeholder="Due Date"
                        onChange={handleDueDateChange}
                        label="Due Date"
                        required={true}
                    />
                    <Field
                        type="select"
                        id="taskPriority"
                        value={priority}
                        options={priorityOptions}
                        onChange={handlePriorityChange}
                        placeholder="Select Priority"
                        required={true}
                        label="Priority"
                    />
                    <Field
                        type="select"
                        id="taskStatus"
                        value={status}
                        options={statusOptions}
                        onChange={handleStatusChange}
                        placeholder="Select Status"
                        required={true}
                        label="Status"
                    />
                    <Button onClick={saveEditedTask} size="small" type="success">
                        Save
                    </Button>
                </div>
            </div>
            {/* End Task Body */}
        </div>
    );
}
