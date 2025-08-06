import { useState } from "react"
import "../style/NewTask.css"
import data from "../configs/configuration_file.json";
import { useUserContext } from "../context/context";
 

export function NewTask({ onSave, onDelete }) {
    const context = useUserContext();

        const [selectedPriority, setSelectedPriority] = useState("");
        const [selectedCategory, setSelectedCategory] = useState("");
        const [selectedPending, setSelectedPending] = useState("");


        const priorityImages = {
            low: "../public/priority-low.png",
            mid: "/public/priority-mid.png",
            high: "/public/priority-high.png"
            };

        const handlePriorityChange = (e) => {
            setSelectedPriority(e.target.value);
        };

        const handleCategoryChange = (e) => {
            setSelectedCategory(e.target.value);
        };

        const handlePendingChange = (e) => {
            //.task-bar-out color 
            //.task-bar-in height
            if (e.target.value == data.task_labels.Pending[0]) {
                setSelectedPending("green");
            } else if (e.target.value == data.task_labels.Pending[1]) {
                setSelectedPending("yellow");
            } else if (e.target.value == data.task_labels.Pending[2]) {
                setSelectedPending("red");

            }
        }

    return (
        <div class="overlay">
                <div class="popup-new-task">
                    <div className="task-top-attributes">
                        <select id="priority-selector" name="priority" required defaultValue="" onChange={handlePriorityChange}>
                            <option value="" disabled >{Object.keys(data.task_labels)[0]}</option>
                            <option value={priorityImages.high}>{data.task_labels.Priority[0]}</option>
                            <option value={priorityImages.mid}>{data.task_labels.Priority[1]}</option>
                            <option value={priorityImages.low}>{data.task_labels.Priority[2]}</option>
                        </select>
                        <select id="category-selector" name="category" required defaultValue="" onChange={handleCategoryChange}>
                            <option value="" disabled>{Object.keys(data.task_labels)[1]}</option>
                            {context.taskCategory.map((category, index) => (
                                <option key={index} value={category}>
                                {category}
                                </option>
                            ))}
                        </select>
                        <select id="pending-selector" name="pending" required defaultValue="" onChange={handlePendingChange}>
                            <option value="" disabled>{Object.keys(data.task_labels)[2]}</option>
                            <option value="opcion1">{data.task_labels.Pending[0]}</option>
                            <option value="opcion2">{data.task_labels.Pending[1]}</option>
                            <option value="opcion3">{data.task_labels.Pending[2]}</option>
                        </select>
                        
                    </div>
                    <div className="task-parameters-icons">
                        <img src={selectedPriority} alt="" />
                        {selectedCategory && (<label htmlFor="">{selectedCategory}</label>) }
                    </div>
                    <div className="task-content-bar">
                        <div className="task-content">
                            <input className="task-title" placeholder="Task title"/>
                            <textarea className="task-description" rows="9" placeholder="Description"></textarea> 
                        </div>
                        <div className="task-bar">
                            <div className="task-bar-out" style={{backgroundColor: selectedPending}}>
                                <div className="task-bar-in">
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                    <div className="bottom-buttons">
                        <button className="task-delete" onClick={onDelete}>Delete</button>
                        <button className="task-ok" onClick={onSave}>Save</button>
                    </div>
                </div>
            </div>
    )
}