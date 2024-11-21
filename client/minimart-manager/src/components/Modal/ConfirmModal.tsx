import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
