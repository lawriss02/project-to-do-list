import "../style/DeleteTask.css"

export function DeleteTask() {
    return (
        <div class="overlay">
                <div class="popup-delete">
                    <p>Are you sure you want to delete this task?</p>
                    <div className="bottom-buttons">
                        <button className="popup-btn-delete">Cancel</button>
                        <button className="popup-btn-delete">Delete</button>
                    </div>
                    
                </div>
            </div>
    )
}