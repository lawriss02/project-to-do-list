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
                <Task/> <Task/> <Task/> <Task/> <Task/> <Task/> <Task/> <Task/> <Task/> 
            </div>
            <button className="btn-new-task">+ New task</button>

            <div class="overlay">
                <div class="popup-new-task">
                    <div className="task-top-attributes">
                        <select id="priority-selector" name="priority" required>
                            <option value="" disabled selected>Priority</option>
                            <option value="opcion1">High</option>
                            <option value="opcion2">Medium</option>
                            <option value="opcion3">Low</option>
                        </select>
                        <select id="category-selector" name="category" required>
                            <option value="" disabled selected>Category</option>
                            <option value="opcion1">Sport</option>
                            <option value="opcion2">Fun</option>
                            <option value="opcion3">Study</option>
                        </select>
                        <select id="pending-selector" name="pending" required>
                            <option value="" disabled selected>Pending</option>
                            <option value="opcion1">Completed</option>
                            <option value="opcion2">In progress</option>
                            <option value="opcion3">Pending</option>
                        </select>
                        
                    </div>
                    <p className="task-title">Task title</p>
                    <p className="task-description">Description</p>
                    <div className="bottom-buttons">
                        <button className="task-delete">Delete</button>
                        <button className="task-ok">Save</button>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}