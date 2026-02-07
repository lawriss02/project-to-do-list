import "../style/DeleteTask.css"; 
import { useUserContext } from "../context/context";


export function ResetTasks({onCancel}) {
    const context = useUserContext();

    function deleteAllTasks() {
        localStorage.setItem("tasks", []);
        context.setTasks([]);
    }

    return (
        <div class="overlay">
                <div class="popup-delete">
                    <p>Are you sure you want to reset the page and delete all tasks?</p>
                    <div className="popup-bottom-buttons">
                        <button className="popup-btn-delete" onClick={() => {onCancel();}} >Cancel</button>
                        <button className="popup-btn-delete" onClick={() => {onCancel(); deleteAllTasks();}}>Delete</button>
                    </div>
                    
                </div>
            </div>
    )
}