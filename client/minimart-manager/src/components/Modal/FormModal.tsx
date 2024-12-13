import React from 'react';
import RoundedButton from '../Button/RoundedButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  isFormValid: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, onSubmit, isFormValid = false }) => {
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
        <div className="px-6 flex py-4 gap-x-4">
          <RoundedButton disable={!isFormValid} label="Save" color={isFormValid ? "bg-cyan-500":"bg-transparent"} onClick={handleSubmit} /> 
          <RoundedButton label='Cancel' onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
