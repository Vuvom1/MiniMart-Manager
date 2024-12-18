import React, { useEffect, useState } from 'react';
import RoundedButton from '../Button/RoundedButton';
import TextField from '../InputField/TextField';
import { TailwindColors } from '../../constant/enum';
import ColorPicker from '../Picker/ColorPicker';
import ValidationUtil from '../../utils/ValidationUtil';
import { addPosition } from '../../services/api/PositionApi';
import SuccessToast from '../Toast/SuccessToast';
import toast from 'react-hot-toast';
import ErrorToast from '../Toast/ErrorToast';

interface AddPositionModalProps {
    onAdd?: () => void;
    onClose: () => void;
}

const AddPositionModal: React.FC<AddPositionModalProps> = ({onAdd, onClose }) => {
    const [color, setColor] = useState("white");
    const [name, setName] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleValidationChange = (isValid: boolean) => {
        setIsValid(isValid);
      };
    
      const handleAddPosition = async () => {
        try {
            const resposne = await addPosition(name, color);

            toast.custom((t) => (
                <SuccessToast
                    message={resposne}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
            onAdd?.();
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast
                    message={error || "Add position failed"}
                    onDismiss={() => toast.dismiss(t.id)}
                />));
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md p-4 max-w-2xl w-full px-6">
                <h2 className="text-lg font-medium mb-4">Add new position</h2>
                <div className='flex flex-col'>
                    <div className='flex gap-x-4'>
                        <ColorPicker 
                        validations={[ValidationUtil.validateRequired('Position color')]}
                        validationPassed={handleValidationChange}
                        label='Color' colors={Object.values(TailwindColors)} selectedColor={color} onChange={(color) => setColor(color)} />
                        <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        validations={[ValidationUtil.validateRequired('Position name')]}
                        validationPassed={handleValidationChange}
                        placeholder='Enter position name...' label='Position name' width='60%' />
                    </div>

                </div>

                <div className='flex gap-x-4'>
                    <div className="flex justify-end mt-4">
                        <RoundedButton 
                        disable={!isValid}
                        color='bg-cyan-400 text-white' 
                        onClick={() => {
                            handleAddPosition(),
                            onClose()
                        }}
                        label='Save' />
                    </div>
                    <div className="flex justify-end mt-4">
                        <RoundedButton label='Cancel' onClick={() => onClose()} />
                    </div>

                </div>


            </div>
        </div>
    );
};

export default AddPositionModal;
