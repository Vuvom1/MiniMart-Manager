import React, { useEffect, useState } from 'react';
import TextField from '../InputField/TextField';
import useSearch from '../../utils/SearchUtil';
import { ScheduleDetail } from '../../data/Entities/ScheduleDetail';
import { getAllShift } from '../../services/api/ShiftApi';
import { Schedule } from '../../data/Entities/Schedule';
import { Shift } from '../../data/Entities/Shift';
import { Employee } from '../../data/Entities/Employee';

interface AddEventModalProps {
    employee?: Employee;
    scheduleId: string;
    date: string,
    onClose: () => void;
    isOpen?: boolean;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ employee, scheduleId, onClose, isOpen = false }) => {
    const [shifts, setShifts] = useState<Shift[]>();

    const fetchShifts = async () => {
        try {
            const data = await getAllShift();

            setShifts(data);

        } catch (error) {
            console.error('Error fetching imports:', error);
        }
    };


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
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">


                    {filteredData.map((shift) => (
                        <div
                            key={shift._id}
                            className="flex justify-between p-2 border-b cursor-pointer"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <div className={`flex ${shift.style.backgroundColor}`}>
                                <p className='grow'>{shift.name}</p>
                                <p>{shift.startTime} - {shift.endTime}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="text-blue-500">Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;
