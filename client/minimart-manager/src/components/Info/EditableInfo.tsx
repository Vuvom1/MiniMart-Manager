import React, { useState, useEffect } from 'react';

interface EditableInfoProps {
    initialValue: string;
    onValueChange: (newValue: string) => void; 
    editable?: boolean;
}

const EditableInfo: React.FC<EditableInfoProps> = ({ initialValue, onValueChange, editable = true }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleEditClick = () => {
        if (editable) {
            setIsEditing(!isEditing);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onValueChange(value);
    };

    return (
        <div className="flex items-center gap-2">
            {editable ? (
                isEditing ? (
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-cyan-500"
                        autoFocus
                    />
                ) : (
                    <span className="text-gray-700">{value}</span>
                )
            ) : (
                <span className="text-gray-700">{initialValue}</span> // Static text when not editable
            )}

            {editable && (
                <button onClick={handleEditClick} className="p-1 rounded hover:bg-gray-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default EditableInfo;
