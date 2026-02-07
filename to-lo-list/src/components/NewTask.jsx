import { useState, useEffect } from "react"
import "../style/NewTask.css"
import data from "../configs/configuration_file.json";
import { useUserContext } from "../context/context";
 

export function NewTask({ onSave, onDelete, taskData }) {
    const context = useUserContext();

    const priorityImages = {
        low: `${import.meta.env.BASE_URL}priority-low1.png`,
        mid: `${import.meta.env.BASE_URL}priority-mid1.png`,
        high: `${import.meta.env.BASE_URL}priority-high1.png`
    };

    const [selectedPriority, setSelectedPriority] = useState(taskData?.selectedPriority || priorityImages.low);
    const [selectedCategory, setSelectedCategory] = useState(taskData?.selectedCategory || {id: "", name: ""});
    const [selectedPending, setSelectedPending] = useState(taskData?.selectedPending || { status: ""});
    const [title, setTitle] = useState(taskData?.title || "");
    const [description, setDescription] = useState(taskData?.description || "");
    
    
    const pendingBarStyle = {
        completed: {status: "completed", color: "green", height: "0%"},
        inprogress: {status: "inprogress", color: "yellow", height: "45%"},
        pending: {status: "pending", color: "red", height: "80%"},
    }

    const handlePriorityChange = (e) => {
        setSelectedPriority(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        const categoryObj = context.taskCategory.find(cat => cat.id === selectedId);
        setSelectedCategory(categoryObj || { id: "", name: "" });
    };

    const handlePendingChange = (e) => {
        setSelectedPending(pendingBarStyle[e.target.value]);
    }


    const handleAddOrUpdateTask = () => {
 
        if (title != undefined && title != "") {
            const taskObject = { id: taskData?.id || crypto.randomUUID(), title, description, selectedPriority, selectedCategoryId: selectedCategory.id, selectedPending };

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
        } else {
            alert("Title cannot be empty!");
        }

    };

    useEffect(() => {
            console.log(selectedCategory.name);
        }, [selectedCategory]);


    return (
        <div className="overlay">
                <img className="close-img" src={`${import.meta.env.BASE_URL}close2.png`} alt="" onClick={() => onSave()}/>

                <div className="popup-new-task">
                    <div className="task-top-attributes">
                        <select id="priority-selector" required onChange={handlePriorityChange} value={selectedPriority}>
                            <option value="" disabled >{Object.keys(data.task_labels)[0]}</option>
                            <option value={priorityImages.high}>{data.task_labels.Priority[0]}</option>
                            <option value={priorityImages.mid}>{data.task_labels.Priority[1]}</option>
                            <option value={priorityImages.low}>{data.task_labels.Priority[2]}</option>
                        </select>
                        <select 
                            id="category-selector" 
                            required 
                            onChange={handleCategoryChange} 
                            value={selectedCategory.id}
                        >
                            <option value="" disabled>{Object.keys(data.task_labels)[1]}</option>
                            {context.taskCategory.map((category) => (
                                <option key={category.id} value={category.id}>
                                {category.name}
                                </option>
                            ))}
                        </select>
                        <select id="pending-selector" required onChange={handlePendingChange} value={selectedPending.status}>
                            <option value="" disabled>{Object.keys(data.task_labels)[2]}</option>
                            <option value={pendingBarStyle.completed.status}>{data.task_labels.Pending[0]}</option>
                            <option value={pendingBarStyle.inprogress.status}>{data.task_labels.Pending[1]}</option>
                            <option value={pendingBarStyle.pending.status}>{data.task_labels.Pending[2]}</option>
                        </select>
                    </div>
                    <div className="task-parameters-icons">
                        <img src={selectedPriority} alt="" />
                        {selectedCategory?.name && (<label htmlFor="">{selectedCategory.name}</label>) }
                    </div>
                    <div className="task-content-bar">
                        <div className="task-content">
                            <input className="task-title" placeholder="Task title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                            <textarea className="task-description" rows="9" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea> 
                        </div>
                        <div className="task-bar">
                            <div className={`task-bar-out bar-color-${selectedPending.color}`}>
                                <div className="task-bar-in" style={{height: selectedPending.height}}>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                    <div className="bottom-buttons">
                        <button className="task-delete" onClick={() => {onDelete(); }}>Delete</button>
                        <button className="task-ok" onClick={() => {handleAddOrUpdateTask();}}>Save</button>
                    </div>
                </div>
            </div>
    )
}