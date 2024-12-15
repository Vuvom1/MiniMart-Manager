import React, { useEffect, useState } from 'react';
import TextField from '../InputField/TextField';
import { Shift } from '../../data/Entities/Shift';
import SelectField from '../InputField/SelectField';
import { BreakDuration, Time } from '../../constant/enum';
import TimeField from '../InputField/TimeField';
import RoundedButton from '../Button/RoundedButton';
import { TimeUtil } from '../../utils/TimeUtil';
import { Position } from '../../data/Entities/Position';
import { getAllPositions } from '../../services/api/PositionApi';
import CustomErrorToast from '../Toast/ErrorToast';
import toast from 'react-hot-toast';
import { Popover } from '@headlessui/react';
import { ColorUtil } from '../../utils/ColorUtil';
import useSearch from '../../utils/SearchUtil';
import AddPositionModal from './AddPositionModal';
import { editShift } from '../../services/api/ShiftApi';
import SuccessToast from '../Toast/SuccessToast';
import DateField from '../InputField/DateField';
import DatePicker from '../Picker/DatePicker';

interface EditEventModalProps {
    shift: Shift;
    OnEdit: () => void;
    onClose: () => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ shift, OnEdit, onClose }) => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [title, setTitle] = useState(shift.title || "");
    const [date, setDate] = useState<Date>(new Date(shift.date));
    const [startTime, setStartTime] = useState<string>(shift.startTime);
    const [endTime, setEndTime] = useState<string>(shift.endTime);
    const [position, setPosition] = useState<Position | null>(shift.position || null);
    const [breakDuration, setBreakDuration] = useState<{ label: string; value: string } | null>({
        label: shift.breakDuration || "No break",
        value: shift.breakDuration || "",
    });
    const [notes, setNotes] = useState(shift.notes || "");
    const [isOpenAddPositionModal, setIsOpenAddPositionModal] = useState(false);

    const timeUtil = new TimeUtil();
    const colorUtil = new ColorUtil();
    const { searchTerm, handleSearchChange, filteredData } = useSearch(positions);

    const fetchPositions = async () => {
        try {
            const data = await getAllPositions();
            setPositions(data);
        } catch (message: any) {
            toast.custom((t) => (
                <CustomErrorToast
                    message={message || 'Error fetching positions'}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        }
    };

    const handleUpdateEvent = async () => {
        try {
            if (!position) {
                toast.custom((t) => (
                    <CustomErrorToast
                        message="Please select position"
                        onDismiss={() => toast.dismiss(t.id)}
                    />
                ));
                
                return;
            }

            const updatedShift: Shift = {
                ...shift,
                title,
                date: date.toISOString(),
                startTime,
                endTime,
                position,
                breakDuration: breakDuration?.value || "",
                notes,
            };

            const response = await editShift(
                updatedShift._id || '',
                updatedShift.title || '',
                updatedShift.date || '',
                updatedShift.startTime || '',
                updatedShift.endTime || '',
                updatedShift.schedule._id || '',
                updatedShift.position._id || '',
                updatedShift.breakDuration || '',
                updatedShift.notes || '',
            );

            toast.custom((t) => (
                <SuccessToast
                    message={response}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));

            OnEdit();
        } catch (message: any) {
            toast.custom((t) => (
                <CustomErrorToast
                    message={message || 'Error updating shift'}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        }
    };

    useEffect(() => {
        fetchPositions();
    }, [isOpenAddPositionModal]);

    return (
        <>
            {isOpenAddPositionModal ? (
                <AddPositionModal onAdd={fetchPositions} onClose={() => setIsOpenAddPositionModal(false)} />
            ) : (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-md p-4 max-w-2xl w-full px-6">
                        <h2 className="text-lg font-medium mb-4">Edit Shift</h2>

                        <div className="flex flex-col gap-6 overflow-y-auto my-4">

                            <div className='flex gap-x-4 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                                <TextField
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    placeholder="Shift title"
                                />
                            </div>
                            <div className='flex gap-x-4 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            <DatePicker width='25%' value={date} onChange={(newDate) => setDate(newDate)} />
                                <TimeField max={endTime} width='20%' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                <TimeField min={startTime} width='20%' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                <p>{timeUtil.timeDifference(startTime || "0:00", endTime || "0:00")}</p>
                            </div>


                            <div className='flex gap-x-4 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                                </svg>

                                <Popover className="relative">
                                    <Popover.Button className="w-full">
                                        <div className={`flex gap-x-2 rounded-full py-1 px-6 w-fit items-center text-${colorUtil.getStrongerColor(position?.color || "black")} bg-${position?.color || "gray-200"}`}>
                                            <p className={`flex `}
                                            >{position?.name || "No position"}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                            </svg>

                                        </div>
                                    </Popover.Button>
                                    <Popover.Panel className="absolute z-10 mt-2 bg-white border rounded shadow-lg p-2">
                                        <div className="flex gap-x-2 mb-2">
                                            <TextField
                                                value={searchTerm}
                                                onChange={(e) => handleSearchChange(e.target.value)}
                                                width='300px'
                                                placeholder='Search for position'
                                            />
                                            <div className='flex items-center'>
                                                <RoundedButton onClick={() => setIsOpenAddPositionModal(true)} height='30px' width='150px' label='Add position' />
                                            </div>

                                        </div>
                                        <ul className='max-h-28 overflow-y-auto'>
                                            {filteredData.map((pos) => (
                                                <li
                                                    key={pos._id}
                                                    onClick={() => setPosition(pos)}
                                                    className="cursor-pointer p-2 hover:bg-gray-100 w-full"
                                                >
                                                    <div className='flex gap-x-2 w-fit items-center'>
                                                        <div className={`w-4 h-4 rounded-full bg-${pos.color}`}></div>
                                                        <p>{pos.name}</p>
                                                    </div>

                                                </li>
                                            ))}
                                        </ul>
                                    </Popover.Panel>
                                </Popover>
                            </div>

                            <div className='flex gap-x-4 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M10.5 8.25h3l-3 4.5h3" />
                                </svg>
                                <SelectField
                                    onChange={(value) => setBreakDuration(value)}
                                    width="200px"
                                    placeholder="Break duration"
                                    value={breakDuration}
                                    options={[
                                        { value: BreakDuration.Short, label: "15m" },
                                        { value: BreakDuration.Medium, label: "30m" },
                                        { value: BreakDuration.Long, label: "60m" },
                                    ]}
                                />
                                <p>Unpaid break</p>
                            </div>

                            <div className='flex gap-x-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                                </svg>

                                <TextField
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Notes"
                                    height="100px"
                                />
                            </div>

                        </div>
                        <div className="flex gap-x-4">
                            <RoundedButton color='bg-cyan-400 text-white'  onClick={handleUpdateEvent} label="Update" />
                            <RoundedButton onClick={onClose} label="Cancel" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditEventModal;
