// CustomErrorToast.tsx
import React from 'react';

interface CustomErrorToastProps {
    message: string;
    onDismiss: () => void;
}

const CustomErrorToast: React.FC<CustomErrorToastProps> = ({ message, onDismiss }) => {
    return (
        <div className='flex justify-around bg-red-200 py-2 border border-red-500 rounded-lg'>
            <span className='px-4'>❌</span>
            <span className=''>{message}</span>
            <button onClick={onDismiss} className='px-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </button>
        </div>
    );
};

export default CustomErrorToast;
