// CustomErrorToast.tsx
import React from 'react';

interface CustomErrorToastProps {
    message: string;
    onDismiss: () => void;
}

const ErrorToast: React.FC<CustomErrorToastProps> = ({ message, onDismiss }) => {
    return (
        <div className='flex justify-around bg-red-200/50 py-6 px-4 border border-red-500  text-red-800 rounded-lg'>
            
            <div className='flex gap-x-4'>
                <span className='text-red-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </span>
                <span className='text-lg'>{message}</span>
            </div>
            <div className='flex justify-end'>
                <button onClick={onDismiss} className='px-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </button>
            </div>

        </div>
    );
};

export default ErrorToast;
