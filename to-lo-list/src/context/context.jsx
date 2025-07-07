import { createContext, useContext, useState } from "react";


const userContext = createContext();

export const useUserContext = () => {
    return useContext(userContext);
}

export const UserContext = ({ children }) => {
    // poner cursor timeline
    const [username, setUsername] = useState(null);

    

    const context = {
        username,
        setUsername
    };

    return (
        <userContext.Provider value={context}>
            {children}
        </userContext.Provider>
    );

}