import { useContext, useEffect, useState } from "react";
import data from "../configs/configuration_file.json"; 
import { useUserContext } from "../context/context";
import "../style/ListPage.css"
import {Task} from "../components/Task"
import { NewTask } from "../components/NewTask";
import { useNavigate } from "react-router-dom";
import { DeleteTask } from "../components/DeleteTask";
import { ResetTasks } from "../components/ResetTasks";
import { ManageTags } from "../components/ManageTags";


export function ListPage() {
    const context = useUserContext();
    const navigate = useNavigate();
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);

    // components visibility
    const [showTask, setShowTask] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showResetPopup, setShowResetPopup] = useState(false);
    const [showManageTags, setShowManageTags] = useState(false);

    const handleOpenTask = (task) => {
        setTaskToEdit(task);
        setShowTask(true);
    };

    useEffect(() => { 
        //console.log('TASKS: ', context.tasks);
        setTotalTasks(context.tasks.length);
        let count = 0;
        for (let i=0; i<context.tasks.length; i++) {
            if (context.tasks[i].selectedPending.status === "completed") {
                count += 1;
            }
        }
        setCompletedTasks(count);

    }, [context.tasks]);

    return(
        <div className="main-content-list" style={{backgroundColor: data.style.background_color}}>
            <div className="top-bar">
                <button>Completed tasks: {completedTasks}/{totalTasks}</button>
                <button className="btn-reset" onClick={() => {setShowResetPopup(true)}}>Reset</button>
                {showResetPopup && <ResetTasks onCancel={() => setShowResetPopup(false)}/>}
                <button onClick={() => {setShowManageTags(true)}}>Manage tags</button>
                {showManageTags && <ManageTags onClose={() => setShowManageTags(false)}/>}    
            </div>
            <div className="container-title-list">
                <p className="title-to-do">{context.username}'s TO DOs</p>
                <div className="task-list-container">
                    {context.tasks.map((userTask, index) => (
                        <Task key={userTask.id} task={userTask} onClick={() => handleOpenTask(userTask)}/>
                    ))}
                </div>
            </div>
            
            <button className="btn-new-task" onClick={() => { setTaskToEdit(null); setShowTask(true); }}>+ New task</button>
            {showTask && <NewTask taskData={taskToEdit} onSave={() => setShowTask(false)} onDelete={() => setShowDeletePopup(true)}/>}
            {showDeletePopup && <DeleteTask taskData={taskToEdit} onCancel={() => setShowDeletePopup(false)} onDelete={() => {setShowDeletePopup(false); setShowTask(false)}}/>}
        </div>
    )
}

/* <p className="task-title" contenteditable="true">Task title</p> */
/*{showDeletePopup && <DeleteTask onDelete={() => setShowDeletePopup(true)} />}*/
