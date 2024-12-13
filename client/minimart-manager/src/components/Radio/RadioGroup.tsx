import React from 'react';

interface RadioGroupProps {
    options: { label: string; value: any }[];
    name: string;
    selectedValue: string;
    onChange: (value: any) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, name, selectedValue, onChange }) => {
    return (
        <div>
            {options.map((option) => (
                <div
                    className={`flex items-center mb-4`}
                    key={option.value}
                >
                    <input
                        id={`radio-${option.value}`}
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => onChange(option.value)}
                        className="hidden"
                    />
                    <label
                        htmlFor={`radio-${option.value}`}
                        className="flex items-center cursor-pointer"
                    >
                        <span className={`w-4 h-4 mr-2 rounded-full border border-cyan-700 flex items-center justify-center ${selectedValue === option.value ? 'bg-cyan-700' : 'bg-white'}`}>
                            {selectedValue === option.value && (
                                <>
                                    <span className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                                        <span className="w-2 h-2 inline-block rounded-full bg-cyan-700"></span>
                                    </span>
                                </>
                            )}
                        </span>
                        <span className="text-sm text-gray-900">{option.label}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default RadioGroup;
