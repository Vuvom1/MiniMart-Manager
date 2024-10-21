import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

interface CheckBoxProps {
    id?: string;
    label?: string;
    name?: string;
    value?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function CheckBox({
    id,
    label,
    name,
    value = false,
    onChange
}: CheckBoxProps) {
    const [isChecked, setIsChecked] = useState(value);

    const handleChange = (checked: boolean) => {
        setIsChecked(checked);
        if (onChange) {
            onChange(checked);
        }
    };

    return (
        <div className="flex w-full gap-x-2 items-center">
            <Checkbox
                name={name}
                checked={isChecked}
                onChange={handleChange}
                className={`relative block w-5 h-5 rounded border transition-colors duration-200 ease-in-out ${
                    isChecked ? "bg-cyan-500 border-cyan-500" : "bg-white border-gray-300"
                }`}
            >
                <span className="absolute inset-0 flex items-center justify-center">
                    <CheckIcon className={`h-4 w-4 text-white ${isChecked ? "block" : "hidden"}`} />
                </span>
            </Checkbox>
            {label && (
                <label htmlFor={id} className="text-sm text-gray-700">
                    {label}
                </label>
            )}
        </div>
    );
}
