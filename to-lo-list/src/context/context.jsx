import { createContext, useContext, useState } from "react";
import data from "../configs/configuration_file.json";

const userContext = createContext();

export const useUserContext = () => {
    return useContext(userContext);
}

export const UserContext = ({ children }) => {
    // poner cursor timeline
    const [username, setUsername] = useState(null);
    const [taskCategory, setTaskCategory] = useState(data.task_labels.Category);
    

    const context = {
        username,
        setUsername,
        taskCategory,
        setTaskCategory
    };

    return (
        <userContext.Provider value={context}>
            {children}
        </userContext.Provider>
    );

}