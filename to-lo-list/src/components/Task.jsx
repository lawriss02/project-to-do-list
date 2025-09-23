import { useEffect } from "react"
import "../style/Task.css"

export function Task({task, onClick }) {

    //{taskInfo.title}
    /*useEffect(() => {
        console.log('USER TASK: ', task);
    }, []); */

    return (
        <div className="task" onClick={onClick}>
            <div className="task-content-left">
                <div className="task-parameters-icons">
                    <img className="task-icon-priority" src={task.selectedPriority} alt=""/>
                    {task.selectedCategory && (<label htmlFor="">{task.selectedCategory}</label>) }
                </div>
                <p>{task.title}</p>
            </div>
            
            <div className="task-bar">
                <div className="task-bar-out" style={{backgroundColor: task.selectedPending.color}}>
                    <div className="task-bar-in" style={{height: task.selectedPending.height}}>
                    </div>
                </div>
            </div>
        </div>
    )
}