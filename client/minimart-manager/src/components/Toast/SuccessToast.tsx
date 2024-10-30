import React from 'react';

interface SuccessToastProps {
    message: string;
    onDismiss: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, onDismiss }) => {
    return (
        <div className='flex justify-around border-green-500 py-2 border bg-green-100 rounded-lg'>
            <span className='px-4'>✅</span>
            <span className=''>{message}</span>
            <button onClick={onDismiss} className='px-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </button>
        </div>
    );
};

const styles = {
    toast: {
        background: '#4caf50', 
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
    icon: {
        marginRight: '8px',
    },
    message: {
        flex: 1,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default SuccessToast;
