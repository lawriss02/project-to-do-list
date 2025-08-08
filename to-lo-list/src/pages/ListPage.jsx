import { useContext, useEffect, useState } from "react";
import data from "../configs/configuration_file.json"; 
import { useUserContext } from "../context/context";
import "../style/ListPage.css"
import {Task} from "../components/Task"
import { NewTask } from "../components/NewTask";
import { useNavigate } from "react-router-dom";
import { DeleteTask } from "../components/DeleteTask";


export function ListPage() {
    const context = useUserContext();
    const navigate = useNavigate();
    const [showTask, setShowTask] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleOpenTask = (task) => {
        setTaskToEdit(task);
        setShowTask(true);
    };
    /*useEffect(() => { 
        //console.log(showDeletePopup);
    }, [showDeletePopup]);*/

    return(
        <div className="main-content-list" style={{backgroundColor: data.style.background_color}}>
            <div className="top-bar">
                <button>Pending tasks: 10/10</button>
                <button>Manage tags</button>
            </div>
            <p className="title-to-do">{context.username}'s TO DOs</p>
            <div className="task-list-container">
                {context.tasks.map((userTask, index) => (
                    <Task key={userTask.id} task={userTask} onClick={() => handleOpenTask(userTask)}/>
                ))}
            </div>
            <button className="btn-new-task" onClick={() => { setTaskToEdit(null); setShowTask(true); }}>+ New task</button>
            {showTask && <NewTask taskData={taskToEdit} onSave={() => setShowTask(false)} onDelete={() => setShowDeletePopup(true)}/>}


        </div>
    )
}

/* <p className="task-title" contenteditable="true">Task title</p> */
/*{showDeletePopup && <DeleteTask onDelete={() => setShowDeletePopup(true)} />}*/