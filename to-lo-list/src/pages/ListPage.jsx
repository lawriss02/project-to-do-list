import { useContext } from "react";
import data from "../configs/configuration_file.json"; 
import { useUserContext } from "../context/context";
import "../style/ListPage.css"
import {Task} from "../components/Task"

export function ListPage() {
    const context = useUserContext();
    return(
        <div className="main-content-list" style={{backgroundColor: data.style.background_color}}>
            <div className="top-bar">
                <button>Pending tasks: 10/10</button>
                <button>Manage tags</button>
            </div>
            <p className="title-to-do">{context.username}'s TO DOs</p>
            <div className="task-list-container">
                <Task/> <Task/> <Task/> <Task/>
            </div>
        </div>
    )
}