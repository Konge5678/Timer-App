import React from "react";

export default function InputField({label, value, onChange, placeHolder }) {
    return (
        <div className="text-2xl">
            <label className="text-stone-300">{label}:</label>
            <input type="number"
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            className="w-10 bg-transparent text-purple-800"
            />
        </div>
    )
}