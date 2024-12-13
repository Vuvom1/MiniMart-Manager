import React, { useState, useEffect } from 'react';

interface IncrementalFieldProps {
    onQuantityChange: (value: number) => void;
    initialValue?: number;
    style?: string, 
}

const IncrementalField: React.FC<IncrementalFieldProps> = ({ onQuantityChange, initialValue = 1, style }) => {
    const [quantity, setQuantity] = useState(initialValue);

    const handleIncrement = () => {
        setQuantity((prev) => {
            const newQuantity = prev + 1;
            onQuantityChange(newQuantity);
            return newQuantity;
        });
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity((prev) => {
                const newQuantity = prev - 1;
                onQuantityChange(newQuantity);
                return newQuantity;
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setQuantity(value);
            onQuantityChange(value);
        }
    };

    return (
        <div>
            <div className="relative flex items-center gap-x-1 max-w-[8rem] ">
            <div className="relative flex items-center max-w-[8rem]">
        <button onClick={handleDecrement} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="flex items-center hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2.5 h-4 focus:ring-gray-100 focus:ring-2 focus:outline-none">
            <svg className="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
        </button>
        <input value={quantity} onChange={(e)=>handleChange(e)} type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-white border-x-0 border-y border-gray-300 h-4 py-3 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full" placeholder="999" required />
        <button onClick={handleIncrement} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="flex items-center hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2.5 h-4 focus:ring-gray-100 focus:ring-2 focus:outline-none">
            <svg className="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
        </div>
            </div>
        </div>
    );
};

export default IncrementalField;
