import React from 'react';

interface SuccessToastProps {
    message: string;
    onDismiss: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, onDismiss }) => {
    return (
        <div className='flex justify-around bg-green-200/50 py-6 px-4 border border-green-500 text-green-800 rounded-lg'>
            <div className='flex gap-x-4'>
                <span className='text-green-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
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

export default SuccessToast;
