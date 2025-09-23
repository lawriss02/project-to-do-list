import "../style/ManageTags.css";

import { useUserContext } from "../context/context";


export function ManageTags() {
    const context = useUserContext();

    return (
        <div class="overlay">
                <div class="popup-manage-tags">
                    
                    <button>Add tag</button>
                    
                </div>
            </div>
    )
}

export function Tag() {
    return(
        <div className="tag">
            <input type="text" />
            <input type="color" id="favcolor" name="favcolor" value="#ff0000"></input>
            <button>Edit</button>
            <button>OK</button>
            <button>Delete</button>
        </div>
    )
}