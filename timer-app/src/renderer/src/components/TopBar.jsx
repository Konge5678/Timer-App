import React from "react";
import { IoRemoveSharp, IoCloseSharp } from "react-icons/io5";

export default function TopBar() {

    const closeWindow = () => {
        window.electron.ipcRenderer.send('close-window')
    }

    const minimizeWindow = () => {
        window.electron.ipcRenderer.send('minimize-window')
    }

    return (
        <div>
            <div className="bg-purple-700 w-screen h-5 rounded-t-xl" style={{webkitAppRegion: "drag"}}></div>
            <div className="absolute top-0 right-2" id="control-buttons">
                <button className=" hover:bg-purple-900" id="minimize" onClick={minimizeWindow} style={{webkitAppRegion: "no-drag"}}><IoRemoveSharp /></button>
                <button className=" hover:bg-purple-900" id="close" onClick={closeWindow} style={{webkitAppRegion: "no-drag"}}><IoCloseSharp /></button>
            </div>
        </div>
    )
}