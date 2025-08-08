import { createContext, useContext, useState, useEffect } from "react";
import data from "../configs/configuration_file.json";

const userContext = createContext();

export const useUserContext = () => {
    return useContext(userContext);
}

export const UserContext = ({ children }) => {

    // ------------------- CREATE / INITIALIZE CONSTANTS -----------------------

    const [username, setUsername] = useState(() => {
        const saved_username = localStorage.getItem("username");
        return saved_username ? JSON.parse(saved_username) : [];
    });

    const [taskCategory, setTaskCategory] = useState(data.task_labels.Category);
    const [tasks, setTasks] = useState(() => {
        const saved_tasks = localStorage.getItem("tasks");
        return saved_tasks ? JSON.parse(saved_tasks) : [];
    });



    // ------------------- SAVE ON LOCAL STORAGE ---------------------

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("username", JSON.stringify(username));
    }, [username]);



    // --------------------- CRUD TASK ACTIONS ---------------------

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter(task => task.id !== id);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // para que persista
            return updatedTasks;
        });
    };

    const updateTask = (id, updatedTask) => {
        setTasks(prev =>
            prev.map(task => task.id === id ? { ...task, ...updatedTask } : task)
        );
    };
    

    const context = {
        username,
        setUsername,
        taskCategory,
        setTaskCategory,
        addTask,
        deleteTask,
        tasks,
        setTasks,
        updateTask
    };

    return (
        <userContext.Provider value={context}>
            {children}
        </userContext.Provider>
    );

}