import { useEffect } from "react"
import "../style/Task.css"

export function Task({task, onClick }) {
    //{taskInfo.title}
    useEffect(() => {
        console.log('USER TASK: ', task);
    }, [])

    return (
        <div className="task" onClick={onClick}>
            <div className="task-content-left">
                <div className="task-parameters-icons">
                    <img src={task.selectedPriority} alt="" style={{height:"20px", weight: "20px"}}/>
                    {task.selectedCategory && (<label htmlFor="">{task.selectedCategory}</label>) }
                </div>
                <h2>{task.title}</h2>
            </div>
            
            <div className="task-bar">
                <div className="task-bar-out" style={{backgroundColor: task.selectedPending.color, height: "70px"}}>
                    <div className="task-bar-in" style={{height: task.selectedPending.height}}>
                    </div>
                </div>
            </div>
        </div>
    )
}