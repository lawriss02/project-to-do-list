import "../style/DeleteTask.css";
import { useUserContext } from "../context/context";


export function DeleteTask({taskData, onCancel, onDelete}) {
    const context = useUserContext();

    return (
        <div class="overlay">
                <div class="popup-delete">
                    <p>Are you sure you want to delete this task?</p>
                    <div className="bottom-buttons">
                        <button className="popup-btn-delete" onClick={() => {onCancel();}} >Cancel</button>
                        <button className="popup-btn-delete" onClick={() => {onDelete(); context.deleteTask(taskData.id)}}>Delete</button>
                    </div>
                    
                </div>
            </div>
    )
}