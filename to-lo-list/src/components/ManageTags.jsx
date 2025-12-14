import "../style/ManageTags.css";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/context";


export function ManageTags({onClose}) {
    const context = useUserContext();
    const [editingIndex, setEditingIndex] = useState(null);
    const [showCategoryDeletePopup, setShowCategoryDeletePopup] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);


    const handleEdit = (index) => setEditingIndex(index);

    const handleChange = (e, index) => {
        const newTags = [...context.taskCategory];
        newTags[index] = { ...newTags[index], name: e.target.value };
        context.setTaskCategory(newTags);
    };

    const handleBlur = () => setEditingIndex(null);

    const handleAddCategory = () => {
        const newCategory = { id: crypto.randomUUID(), name: ""};
        context.addCategory(newCategory);
        setEditingIndex(context.taskCategory.length);
    };

    const checkNotEmptyTags = () => {
        return !context.taskCategory.some(cat => cat.name.trim() === "");            
    }

    return (
        <div class="overlay">
            <div class="popup-manage-tags">
                <img className="close-img" src="../public/close-black.png" alt="" onClick={() => {
                    if (checkNotEmptyTags()) {
                        onClose();
                    } else {
                        alert("Category names cannot be empty!");
                    }
                }}/> 
                <h3>Your tags:</h3>
                <div className="tag-list">
                    {context.taskCategory.map((tag, index) => (
                        
                        <div key={tag.id} className="tag-item">
                            {editingIndex === index ? (
                                <input
                                type="text"
                                value={tag.name}
                                onChange={(e) => handleChange(e, index)}
                                onBlur={handleBlur}
                                autoFocus
                                maxLength={15}
                                />
                            ) : (
                                <label onClick={() => handleEdit(index)}>
                                <span className="tag-span">{tag.name}</span>
                                </label>
                            )}
                            <img src="../../public/delete-icon.png" alt="" onClick={() => {setEditingIndex(index); setShowCategoryDeletePopup(true); setEditingCategory(tag)}}/>
                        </div>
                    ))}
                </div>
                <button onClick={() => {handleAddCategory()}}>+</button>
            </div>       
            {showCategoryDeletePopup && <DeleteCategoryPopup CategoryData={editingCategory} onClose={() => setShowCategoryDeletePopup(false)}/>}     
        </div>
        
    )
}



export function DeleteCategoryPopup({CategoryData, onClose}) {
    const context = useUserContext();

    return (
        <div class="overlay">
                <div class="popup-delete">
                    <p>Are you sure you want to delete category "{CategoryData.name}"?</p>
                    <div className="popup-bottom-buttons">
                        <button className="popup-btn-delete" onClick={() => {onClose();}} >Cancel</button>
                        <button className="popup-btn-delete" onClick={() => {onClose(); context.deleteCategory(CategoryData.id)}}>Delete</button>
                    </div>
                    
                </div>
            </div>
    )
}