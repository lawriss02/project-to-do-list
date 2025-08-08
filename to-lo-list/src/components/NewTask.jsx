import { useState } from "react"
import "../style/NewTask.css"
import data from "../configs/configuration_file.json";
import { useUserContext } from "../context/context";
 

export function NewTask({ onSave, onDelete, taskData }) {
    const context = useUserContext();

    const priorityImages = {
        low: "../public/priority-low.png",
        mid: "/public/priority-mid.png",
        high: "/public/priority-high.png"
    };

    const [selectedPriority, setSelectedPriority] = useState(taskData?.selectedPriority || priorityImages.low);
    const [selectedCategory, setSelectedCategory] = useState(taskData?.selectedCategory || "");
    const [selectedPending, setSelectedPending] = useState(taskData?.selectedPending || "");
    const [title, setTitle] = useState(taskData?.title || "");
    const [description, setDescription] = useState(taskData?.description || "");
    
    const pendingBarStyle = {
        completed: {color: "green", height: "0%"},
        inprogress: {color: "yellow", height: "45%"},
        pending: {color: "red", height: "80%"},
    }

    const handlePriorityChange = (e) => {
        setSelectedPriority(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handlePendingChange = (e) => {
        if (e.target.value == data.task_labels.Pending[0]) {
            setSelectedPending(pendingBarStyle.completed);
        } else if (e.target.value == data.task_labels.Pending[1]) {
            setSelectedPending(pendingBarStyle.inprogress);
        } else if (e.target.value == data.task_labels.Pending[2]) {
            setSelectedPending(pendingBarStyle.pending);

        }
    }


    const handleAddOrUpdateTask = () => {
        const taskObject = { id: taskData?.id || crypto.randomUUID(), title, description, selectedPriority, selectedCategory, selectedPending };

        if (taskData) {
            // Edit mode
            context.updateTask(taskData.id, taskObject);
        } else {
            // Add mode
            context.addTask(taskObject);

            
            setTitle("");
            setDescription("");
            setSelectedPriority("");
            setSelectedCategory("");
            setSelectedPending("");
            
        }

        onSave();
    };

    return (
        <div className="overlay">
                <div className="popup-new-task">
                    <div className="task-top-attributes">
                        <select id="priority-selector" name="priority" required defaultValue="" onChange={handlePriorityChange} value={selectedPriority}>
                            <option value="" disabled >{Object.keys(data.task_labels)[0]}</option>
                            <option value={priorityImages.high}>{data.task_labels.Priority[0]}</option>
                            <option value={priorityImages.mid}>{data.task_labels.Priority[1]}</option>
                            <option value={priorityImages.low}>{data.task_labels.Priority[2]}</option>
                        </select>
                        <select id="category-selector" name="category" required defaultValue="" onChange={handleCategoryChange} value={selectedCategory}>
                            <option value="" disabled>{Object.keys(data.task_labels)[1]}</option>
                            {context.taskCategory.map((category, index) => (
                                <option key={index} value={category}>
                                {category}
                                </option>
                            ))}
                        </select>
                        <select id="pending-selector" name="pending" required defaultValue="" onChange={handlePendingChange} value={selectedPending}>
                            <option value="" disabled>{Object.keys(data.task_labels)[2]}</option>
                            <option value={data.task_labels.Pending[0]}>{data.task_labels.Pending[0]}</option>
                            <option value={data.task_labels.Pending[1]}>{data.task_labels.Pending[1]}</option>
                            <option value={data.task_labels.Pending[2]}>{data.task_labels.Pending[2]}</option>
                        </select>
                        
                    </div>
                    <div className="task-parameters-icons">
                        <img src={selectedPriority} alt="" />
                        {selectedCategory && (<label htmlFor="">{selectedCategory}</label>) }
                    </div>
                    <div className="task-content-bar">
                        <div className="task-content">
                            <input className="task-title" placeholder="Task title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                            <textarea className="task-description" rows="9" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea> 
                        </div>
                        <div className="task-bar">
                            <div className="task-bar-out" style={{backgroundColor: selectedPending.color}}>
                                <div className="task-bar-in" style={{height: selectedPending.height}}>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                    <div className="bottom-buttons">
                        <button className="task-delete" onClick={onDelete}>Delete</button>
                        <button className="task-ok" onClick={() => {onSave(); handleAddOrUpdateTask();}}>Save</button>
                    </div>
                </div>
            </div>
    )
}