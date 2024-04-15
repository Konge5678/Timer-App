import React, { useState, useEffect } from "react";
import InputField from "./inputFields";
import { IoCheckmarkSharp, IoCaretForward, IoPencil } from "react-icons/io5";
import { BsFeather } from "react-icons/bs"
import { IoMdCloseCircleOutline, IoMdPause  } from "react-icons/io";
import alarm from "../assets/sounds/alarm-sound.mp3";
export default function Timer({isOverlay}) {
    const [isEditing, setIsEditing] = useState(true);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const audio = new Audio(alarm)


    useEffect(() => {

        let intervalId

        if (isActive){
            intervalId = setInterval(() => {
                if (seconds > 0){
                    setSeconds((seconds) => seconds - 1);
                } else {
                    if (minutes ===0 && hours === 0){
                        audio.play();
                        clearInterval(intervalId);
                        setIsActive(false);
                    } else {
                        if (minutes === 0) {
                            setHours((hours) => hours - 1);
                            setMinutes(59)
                        } else {
                            setMinutes((minutes) => minutes - 1);
                        }
                        setSeconds(59)
                    }
                }
            }, 1000)
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);

    }, [isActive, hours, minutes, seconds])    

    
    
    return (
        <div>
            {isEditing ? (
                //Time Editing
                <div className="flex ">
                <div>
                    <InputField label={"Hours"} value={hours}
                    onChange={(e)=>setHours(parseInt(e.target.value))}></InputField>
                    <InputField label={"Minutes"} value={minutes}
                    onChange={(e)=>setMinutes(parseInt(e.target.value))}></InputField>
                    <InputField label={"Seconds"} value={seconds}
                    onChange={(e)=>setSeconds(parseInt(e.target.value))}></InputField>
                    <button className="bg-purple-800 text-stone-200 px-14 py-1 rounded-xl text-xl mt-1"
                    onClick={()=>setIsEditing(false)}>
                        <IoCheckmarkSharp />
                    </button>
                </div>
                </div>
            ):(
                //Timer
                <div className="flex justify-center items-center space-x-4">
                    <h1 className="text-pink-500 text-4xl">
                        {hours.toString().padStart(2,"0")}:
                        {minutes.toString().padStart(2,"0")}:
                        {seconds.toString().padStart(2,"0")}
                        </h1>
                        <div className="text-stone-500" id="timer-buttons">
                            {isActive ? 
                            ( <>
                                <button className="start text-3xl text-pink-500 relative top-[3px]" onClick={()=>setIsActive(false)}><IoMdPause /></button>
                                <button className="start text-3xl text-pink-500 relative top-[3px]" onClick={()=>{setIsActive(false) 
                                    setHours(0) 
                                    setMinutes(0)
                                    setSeconds(0) }
                                    }><IoMdCloseCircleOutline /></button>
                                </>
                            ) : 
                            ( <>
                                <button className="start text-4xl text-pink-500" onClick={()=>setIsActive(true)}><IoCaretForward /></button>
                                <button className="start text-2xl text-pink-500 relative top-[-4px]" onClick={()=>setIsEditing(true)}><BsFeather /></button>
                                </>
                            ) 
                        }
                        </div>
                </div>
            )
}
        
        </div>  
    )
}