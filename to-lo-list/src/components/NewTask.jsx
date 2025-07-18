import "../style/NewTask.css"

export function NewTask({ onSave }) {
    return (
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
                    <input className="task-title" placeholder="Task title"/>
                    <textarea className="task-description" rows="11" placeholder="Description"></textarea> 
                    <div className="bottom-buttons">
                        <button className="task-delete">Delete</button>
                        <button className="task-ok" onClick={onSave}>Save</button>
                    </div>
                    
                </div>
            </div>
    )
}