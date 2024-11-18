import React, { useEffect, useState } from 'react';
import TextField from '../InputField/TextField';
import useSearch from '../../utils/SearchUtil';
import { ScheduleDetail } from '../../data/Entities/ScheduleDetail';
import { getAllShift } from '../../services/api/ShiftApi';
import { Shift } from '../../data/Entities/Shift';
import { Employee } from '../../data/Entities/Employee';
import toast from 'react-hot-toast';
import ErrorToast from '../Toast/ErrorToast';
import SuccessToast from '../Toast/SuccessToast';
import { addEventToSchedule } from '../../services/api/ScheduleApi';
import { ScheduleDetailFormData } from '../../data/FormData/ScheduleDetailFormData';
import { WorkShiftBadge } from '../Badge/WorkShiftBadge';

interface AddEventModalProps {
    employee?: Employee;
    scheduleId: string;
    date: string,
    onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ employee, scheduleId, date, onClose }) => {
    const [shifts, setShifts] = useState<Shift[]>();
    const [eventData, setEventData] = useState<ScheduleDetailFormData>();
    const [selectedShift, setSelectedShift] = useState<string | null>(null);

    console.log(scheduleId)

    const fetchShifts = async () => {
        try {
            const data = await getAllShift();

            setShifts(data);

        } catch (error) {
            console.error('Error fetching imports:', error);
        }
    };

    const handleAddEvent = async () => {
        try {
            if (eventData) {
                const response = await addEventToSchedule(scheduleId, eventData)
                console.log(scheduleId)

                toast.custom((t) => (
                    <SuccessToast
                        message={response}
                        onDismiss={() => toast.dismiss(t.id)}
                    />
                ));
            }
                
            onClose();
        } catch (error) {
            toast.custom((t) => (
                <ErrorToast
                    message="Update supplier failed!"
                    onDismiss={() => toast.dismiss(t.id)}
                />));
        }
    }

    const onSelectShift = (shiftId: string) => {
        setSelectedShift(shiftId); 
        setEventData({
            shift: selectedShift || "",
            date: new Date(date),
        });
    }


    useEffect(() => {
        fetchShifts();
    }, []);


    const { searchTerm, handleSearchChange, filteredData } = useSearch(shifts || []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 max-w-md w-full">
                <h2 className="text-lg font-medium mb-4">Add Event to Schedule</h2>
                <h2 className="text-lg mb-4">{employee?.user.firstname} {employee?.user.lastname}</h2>
                <TextField
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search here..."
                    prefix={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    } />
                <div className="grid-cols-3 grid gap-2 max-h-60 overflow-y-auto mt-4">


                    {filteredData.map((shift) => (
                        <div
                            key={shift._id}
                            className={`cursor-pointer ${selectedShift === shift._id ? 'transform scale-105' : ''}`}
                            onClick={() => {
                                onSelectShift(shift._id);
                                // onClose();
                            }}
                        >
                                <WorkShiftBadge name={shift.name} backgroundColor={shift.style.backgroundColor} textColor={shift.style.textColor} startTime={shift.startTime} endTime={shift.endTime}/>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className="flex justify-end mt-4">
                        <button onClick={onClose} className="text-blue-500">Close</button>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleAddEvent} className="text-blue-500">Save</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AddEventModal;
