import React, { useState, useEffect } from 'react';

interface IncrementalFieldProps {
    onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    initialValue?: number;
    style?: string, 
}

const IncrementalField: React.FC<IncrementalFieldProps> = ({ onQuantityChange,initialValue = 1 , style }) => {
    const [quantity, setQuantity] = useState(initialValue);

    const handleIncrement = () => {
        setQuantity((prev) => {
            const newQuantity = prev + 1;
           
            const event = {
                target: { value: newQuantity.toString() },
            } as React.ChangeEvent<HTMLInputElement>;
            onQuantityChange(event);
            return newQuantity;
        });
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity((prev) => {
                const newQuantity = prev - 1;
               
                const event = {
                    target: { value: newQuantity.toString() },
                } as React.ChangeEvent<HTMLInputElement>;
                onQuantityChange(event);
                return newQuantity;
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setQuantity(value);
            onQuantityChange(e);
        }
    };

    return (
        <div>
            <div className="relative flex items-center gap-x-1 max-w-[8rem] ">
                <button
                    type="button"
                    id="decrement-button"
                    onClick={handleDecrement}
                    className="hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2"
                >
                    <svg
                        className="w-2 h-2 text-gray-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                </button>
                <input
                    type="text"
                    id="quantity-input"
                    value={quantity}
                    onChange={handleChange}
                    className="hover:bg-gray-200 border border-gray-300  w-full text-center"
                />
                <button
                    type="button"
                    id="increment-button"
                    onClick={handleIncrement}
                    className="hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2"
                >
                    <svg
                        className="w-2 h-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default IncrementalField;
