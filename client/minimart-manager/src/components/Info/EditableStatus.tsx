import React, { useState, useEffect } from 'react';
import { StatusBadge } from '../Badge/StatusBadge';
import { statusStyleMapping } from '../../constant/mapping';

interface EditableStatusProps {
    initialValue: string;
    onValueChange: (newValue: string) => void;
    options?: string[];
    editable?: boolean;
}

const EditableStatus: React.FC<EditableStatusProps> = ({
    initialValue,
    onValueChange,
    options,
    editable = true,
}) => {
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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onValueChange(value);
    };

    return (
        <div className="flex items-center gap-2">
            {editable ? (
                <select
                    value={value}
                    onChange={handleSelectChange}
                    onBlur={handleBlur}
                    className={`border rounded px-2 py-1 focus:outline-none focus:border-cyan-500 ${statusStyleMapping[value] || "border-gray-300"}`}
                    autoFocus
                >
                    {options && options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <StatusBadge value={value}/>
            )}
        </div>
    );
};

export default EditableStatus;
