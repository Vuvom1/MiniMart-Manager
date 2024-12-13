import React from 'react';

interface NumberFieldProps {
    label?: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    width?: string;
    suffixIcon?: React.ReactNode;
}

const NumberField: React.FC<NumberFieldProps> = ({ label, value, onChange, min, max, step = 0.01, width="100%", suffixIcon }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        if (!isNaN(newValue)) {
            onChange(newValue);
        } else {
            onChange(0);
        }
    };

    return (
        <div className={`flex items-center w-[${width}]`}>
            {label && <label>{label}</label>}
            <div className='flex items-center border border-gray-300 rounded-md px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-cyan-500'>
                <input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                    style={{ flex: 1 }}
                    className="focus:outline-none"
                />
                {suffixIcon && <div style={{ marginLeft: '4px', display: 'flex', alignItems: 'center' }}>{suffixIcon}</div>}
            </div>
        </div>
    );
};

export default NumberField;