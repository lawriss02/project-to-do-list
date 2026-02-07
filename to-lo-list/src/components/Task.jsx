import { useEffect } from "react"
import "../style/Task.css"
import { useUserContext } from "../context/context";

export function Task({task, onClick }) {

    const context = useUserContext();
    const category = context.taskCategory.find(c => c.id === task.selectedCategoryId);

    return (
        <div className={`task color-${task.selectedPending.color}`} onClick={onClick}>
            <div className="task-content-left">
                <div className="task-parameters-icons-t">
                    <img className="task-icon-priority" src={task.selectedPriority} alt=""/>
                    {category && (<label htmlFor="">{category.name}</label>) }
                </div>
                <p>{task.title}</p>
            </div>
            
            <div className="task-bar-t">
                <div className={`task-bar-out-t bar-color-t-${task.selectedPending.color}`}>
                    <div className="task-bar-in-t" style={{height: task.selectedPending.height}}>
                    </div>
                </div>
            </div>
        </div>
    )
}