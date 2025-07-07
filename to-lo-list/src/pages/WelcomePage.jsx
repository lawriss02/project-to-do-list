//import React, { useState } from 'react'
import { useRef } from "react";
import data from "../configs/configuration_file.json"; 
import "../style/WelcomePage.css"
import { useUserContext } from "../context/context";
import { useNavigate } from "react-router-dom";


export function WelcomePage () {
    const context = useUserContext();
    const navigate = useNavigate();
    const inputNameRef = useRef(null);

    function validateName() {
        var name = inputNameRef.current.value;
        if (name!=null && name!="" && name!=" " && name!=undefined) {
            context.setUsername(name);
            navigate("/list");
        } else {
            alert("Type your name please!");
        }
    }

    return (
        <div className="main-content-welcome" style={{backgroundColor: data.style.background_color}}>
            <p className="p-welcome">Hi there! What is your name?</p>
            <input className="input-name" type="text" ref={inputNameRef} />
            <button className="button-start" onClick={validateName}> Start </button>
        </div>
    )
}

