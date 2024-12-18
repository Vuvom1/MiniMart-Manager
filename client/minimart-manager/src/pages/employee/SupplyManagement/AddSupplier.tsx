// Modal.tsx
import React, { useState } from 'react';
import TextField from '../../../components/InputField/TextField';
import { Supplier } from '../../../data/Entities/Supplier';
import toast from 'react-hot-toast';
import ErrorToast from '../../../components/Toast/ErrorToast';
import ValidationUtil from '../../../utils/ValidationUtil';
import RoundedButton from '../../../components/Button/RoundedButton';
import CircleButton from '../../../components/Button/CircleButton';
import { addSupplier } from '../../../services/api/SupplierApi';
import SuccessToast from '../../../components/Toast/SuccessToast';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [supplier, setSupplier] = useState<Supplier>({} as Supplier);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleValidationChange = (isValid: boolean) => {
        setIsFormValid(isValid);
        console.log(isFormValid)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSupplier((prevSupplier) => ({
            ...prevSupplier,
            [name]: value,
        }));
    };

    const handleAddSupplier = async () => {
        try {
            const response = await addSupplier(supplier);

            toast.custom((t) => (
                <SuccessToast
                    message={response}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
            onClose();
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast
                    message={error || "Add supplier failed!"}
                    onDismiss={() => toast.dismiss(t.id)}
                />));
        }
    }


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

            <div className="bg-white p-6 rounded shadow-lg min-w-[50%]">
                <div className="flex flex-col gap-y-4 ">
                    <div className="flex justify-between">
                        <p className='font-medium text-xl'>Add new supplier</p>
                        <CircleButton icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        } onClick={onClose} />
                    </div>

                    <div className="flex gap-x-4 w-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>

                        <TextField
                            onChange={handleInputChange}
                            value={supplier.name}
                            name="name"
                            validations={[ValidationUtil.validateRequired("Supplier name")]}
                            validationPassed={handleValidationChange}
                            placeholder="Enter supplier name..." />
                    </div>

                    <div className="flex gap-x-4 w-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <TextField
                            onChange={handleInputChange}
                            name="email"
                            value={supplier.email}
                            validations={[ValidationUtil.validateRequired("Email"), ValidationUtil.validateEmail]}
                            validationPassed={handleValidationChange}
                            placeholder="Enter email..."
                        />
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>

                        <TextField
                            onChange={handleInputChange}
                            value={supplier.phone}
                            name="phone"
                            validations={[ValidationUtil.validateRequired("Phone number"), ValidationUtil.validatePhoneNumber]}
                            validationPassed={handleValidationChange}
                            placeholder="Enter phone number..." />
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        <TextField
                            onChange={handleInputChange}
                            value={supplier.address}
                            name="address"
                            validations={[ValidationUtil.validateRequired("Address")]}
                            validationPassed={handleValidationChange}
                            placeholder="Enter address..." />
                    </div>


                    <div className="flex gap-x-4 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>

                        <TextField
                            onChange={handleInputChange}
                            value={supplier.description}
                            name="description"
                            placeholder="Enter description..."
                            multiline={true} />
                    </div>

                    <div className='flex gap-x-4'>
                        <RoundedButton disable={!isFormValid} onClick={()=>{handleAddSupplier(), onClose}} label="Confirm" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Modal;``
