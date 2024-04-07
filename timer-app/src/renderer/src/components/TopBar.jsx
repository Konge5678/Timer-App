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
            <div className="bg-blue-400 w-screen h-5" style={{webkitAppRegion: "drag"}}></div>
            <div className="absolute top-0 right-2" id="control-buttons">
                <button className="" id="minimize" onClick={minimizeWindow} style={{webkitAppRegion: "no-drag"}}><IoRemoveSharp /></button>
                <button id="close" onClick={closeWindow} style={{webkitAppRegion: "no-drag"}}><IoCloseSharp /></button>
            </div>
        </div>
    )
}