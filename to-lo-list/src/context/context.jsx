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

    const [taskCategory, setTaskCategory] = useState(() => {
        const saved_categories = localStorage.getItem("categories");

        if (saved_categories) {
            // si ya hay datos guardados, los devolvemos directamente
            return JSON.parse(saved_categories);
        } else {
            // si no hay nada guardado, convertimos las categorías originales en objetos
            const categories = data.task_labels.Category.map((name) => ({
            id: crypto.randomUUID(),
            name,
            }));
            return categories;
        }
    });
    
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

     useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(taskCategory));
    }, [taskCategory]);


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
    

    // --------------------- CRUD CATEGORY ACTIONS ---------------------

     const addCategory = (category) => {
        setTaskCategory((prev) => [...prev, category]);
    };

    const deleteCategory = (id) => {
        setTaskCategory((prevCategories) => {
            const updatedCategories = prevCategories.filter(category => category.id !== id);
            localStorage.setItem("categories", JSON.stringify(updatedCategories)); // para que persista
            return updatedCategories;
        });
    };

    const updateCategory = (id, updatedCategory) => {
        setTaskCategory(prev =>
            prev.map(category => category.id === id ? { ...category, ...updatedCategory } : category)
        );
    };

    const context = {
        username,
        setUsername,
        addTask,
        deleteTask,
        tasks,
        setTasks,
        updateTask,
        taskCategory,
        setTaskCategory,
        addCategory,
        deleteCategory,
        updateCategory
    };

    return (
        <userContext.Provider value={context}>
            {children}
        </userContext.Provider>
    );

}