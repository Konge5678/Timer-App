import React, { useState } from "react";
import InputField from "./inputFields";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function Timer({isOverlay}) {
    const [isEditing, setIsEditing] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    
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
                <div className="flex justify-center">
                    <h1 className="text-pink-500 text-4xl">
                        {hours.toString().padStart(2,"0")}:
                        {minutes.toString().padStart(2,"0")}:
                        {seconds.toString().padStart(2,"0")}
                        </h1>
                        <div id="timer-buttons">
                            {isActive ? 
                            ( <>
                                <button>pause</button>
                                <button>stop</button>
                                </>
                            ) : 
                            ( <>
                                <button>pause</button>
                                <button>stop</button>
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