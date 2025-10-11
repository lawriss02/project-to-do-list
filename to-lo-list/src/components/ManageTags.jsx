import "../style/ManageTags.css";
import { useState } from "react";

import { useUserContext } from "../context/context";


export function ManageTags({onClose}) {
    const context = useUserContext();
    //const [newLabelText, setNewLabelText] =useState(null);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleEdit = (index) => setEditingIndex(index);

    const handleChange = (e, index) => {
        const newTags = [...context.taskCategory];
        newTags[index] = e.target.value;
        context.setTaskCategory(newTags);
    };

    const handleBlur = () => setEditingIndex(null);


    return (
        <div class="overlay">
            <div class="popup-manage-tags">
                <img className="close-img" src="../public/close-black.png" alt="" onClick={() => onClose()}/> 
                <h3>Your tags:</h3>
                <div className="tag-list">
                    {context.taskCategory.map((tag, index) => (
                        
                        <div key={index} className="tag-item">
                            {editingIndex === index ? (
                                <input
                                type="text"
                                value={tag}
                                onChange={(e) => handleChange(e, index)}
                                onBlur={handleBlur}
                                autoFocus
                                maxLength={15}
                                />
                            ) : (
                                <label onClick={() => handleEdit(index)}>
                                <span className="tag-span">{tag}</span>
                                </label>
                            )}
                            <img src="../../public/delete-icon.png" alt="" />
                        </div>

                        
                    ))}
                    


                    
                </div>
                <button>+</button>
                
            </div>
        </div>
    )
}

/*
                        <div className="tag-item">
                            <input type="text" placeholder="aa" value={category} onChange={(e) => setTitle(e.target.value)}/>
                            <img src="../../public/delete-icon.png" alt="" />
                        </div>
*/