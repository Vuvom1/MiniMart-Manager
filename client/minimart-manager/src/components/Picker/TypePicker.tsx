import React from 'react';

interface TypePickerProps {
    label?: string,
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[];
}

const TypePicker: React.FC<TypePickerProps> = ({ label, value, onChange, options }) => {
    return (
        <div className='flex gap-x-4 items-center'>
            {label && <span className='text-sm font-medium leading-6 text-gray-900'>{label}</span>}
            <div className='border rounded-lg'>
                <select className='px-4 py-2' id="type-picker" value={value} onChange={onChange}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    );
};

export default TypePicker;