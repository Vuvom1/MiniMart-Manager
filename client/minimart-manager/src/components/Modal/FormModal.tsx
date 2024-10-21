import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(); 
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg overflow-hidden shadow-lg w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="px-6 py-4">
          {children}
        </div>
        <div className="px-6 w-full py-4 border-t">
          <button
            onClick={handleSubmit} 
            className="bg-cyan-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
