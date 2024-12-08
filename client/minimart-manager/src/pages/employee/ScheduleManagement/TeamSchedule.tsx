import { useEffect, useRef, useState } from "react";
import { WorkShiftBadge } from "../../../components/Badge/WorkShiftBadge";
import RoundedButton from "../../../components/Button/RoundedButton";
import { getAllEmployees } from "../../../services/api/EmployeeApi";
import { addEmployeeToSchedule, getAllSchedules } from "../../../services/api/ScheduleApi";
import toast from "react-hot-toast";
import SuccessToast from "../../../components/Toast/SuccessToast";
import EmployeeSelectionModal from "../../../components/Modal/EmployeeSelectionModal";
import CustomErrorToast from "../../../components/Toast/ErrorToast";
import { Schedule } from "../../../data/Entities/Schedule";
import { TimeUtil } from "../../../utils/TimeUtil";
import AddEventModal from "../../../components/Modal/AddEventModal";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import Avatar from "../../../components/Avatar";
import EditEventModal from "../../../components/Modal/EditEventModal";
import { Shift } from "../../../data/Entities/Shift";
import { deleteShift } from "../../../services/api/ShiftApi";
import { Employee } from "../../../data/Entities/Employee";
import TextField from "../../../components/InputField/TextField";
import useSearch from "../../../utils/SearchUtil";

export function TeamSchedule() {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [unaddedEmployees, setUnaddedEmployees] = useState<Employee[]>([])
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [isOpenAddEmployeeModal, setIsOpendAddEmployeeModal] = useState(false);
    const timeUtil = new TimeUtil();
    const [weekDays, setWeekDays] = useState(timeUtil.getCurrentWeekDays());
    const [popoverEvent, setPopoverEvent] = useState<{
        hasEvent: boolean;
        scheduleId: string;
        date: Date;
        shift: Shift | null,
        position: { top: number, left: number };
    } | null>(null);
    const [isOpentEventPopover, setIsOpenEventPopover] = useState(false);
    const [isOpenEventModal, setIsOpenEventModal] = useState(false);
    const [isOpenEditEventModal, setIsOpenEditEventModal] = useState(false);
    const [isOpenModalDeleteEvent, setIsOpenModalDeleteEvent] = useState(false)
    const popoverRef = useRef<HTMLDivElement | null>(null);
    

    const searchUtil = useSearch(schedules);

    const fetchEmployees = async () => {
        try {
            const data = await getAllEmployees();

            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchSchedules = async () => {
        try {
            const scheduleData = await getAllSchedules();

            setSchedules(scheduleData);

        } catch (message: any) {
            toast.custom((t) => (
                <CustomErrorToast
                    message={message || 'Error fetching schedules '}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        }
    }


    const addEmpployee = async (employeeId: string) => {
        try {
            const response = await addEmployeeToSchedule(employeeId);

            toast.custom((t) => (
                <SuccessToast
                    message={response}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        } catch (message: any) {
            toast.custom((t) => (
                <CustomErrorToast
                    message={message || 'Error adding employee to schedule'}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        }
    }

    const handleDeleteEventClick = () => {
        setIsOpenModalDeleteEvent(true);
    };

    const handleDeleteShift = async (shiftId: string) => {
        try {
            const response = await deleteShift(shiftId);

            toast.custom((t) => (
                <SuccessToast
                    message={response}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        } catch (message: any) {
            toast.custom((t) => (
                <CustomErrorToast
                    message={message || 'Error delete evet'}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        } finally {
            setIsOpenModalDeleteEvent(false);
            setPopoverEvent(null);
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            popoverRef.current &&
            !popoverRef.current.contains(event.target as Node)
        ) {
            setIsOpenEventPopover(false);
            setPopoverEvent(null);
        }
    };

    const handleUnaddedEmployees = () => {
        const unadded = employees.filter(
            (employee) => !schedules.some((schedule) => schedule.employee._id === employee._id)
        );
        setUnaddedEmployees(unadded);
    }


    useEffect(() => {
        if (isOpentEventPopover) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpentEventPopover]);

    useEffect(() => {
        fetchSchedules();
    }, [isOpenEventModal, isOpenModalDeleteEvent, isOpenAddEmployeeModal, isOpenEditEventModal]);

    useEffect(() => {
        fetchEmployees();
        handleUnaddedEmployees();
        console.log(unaddedEmployees);
    }, [isOpenAddEmployeeModal]);

    return (
        <>
            <div className="flex flex-col gap-y-4">
                <div className="bg-white rounded-lg">
                    <div className="flex justify-between p-4">
                        <div className="flex gap-x-2">
                            <RoundedButton onClick={() => setWeekDays(timeUtil.getPrevWeekDays(weekDays))} label="" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            } />
                            <p className="text-2xl self-center text-gray-500">{timeUtil.formatDateToDayMonthYear(weekDays[0]?.date)} - {timeUtil.formatDateToDayMonthYear(weekDays[weekDays.length - 1]?.date)} </p>
                            <RoundedButton onClick={() => setWeekDays(timeUtil.getNextWeekDays(weekDays))} label="" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                            } />
                        </div>

                        <RoundedButton onClick={() => setIsOpendAddEmployeeModal(true)} label="Asign Employee" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                        } color="text-white bg-cyan-500" />
                    </div>

                    <div className="grow overflow-y-auto max-h-[calc(100vh-220px)] rounded-lg">
                        <table className="table-auto w-full table-layout-fixed bg-white text-center items-center grow rounded-lg shadow-md">
                            <thead className="table-header sticky top-0 border shadow-gray-300 shadow-sm">
                                <tr className="rounded-md">
                                    <th className="sticky bg-white border border-gray-300 px-4 py-4">
                                        <TextField 
                                            value={searchUtil.searchTerm}
                                            placeholder="Search employee..." 
                                            suffix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                            </svg>
                                            } 
                                            onChange={(e) => searchUtil.handleSearchChange(e.target.value)}
                                        />
                                    </th>
                                    {weekDays.map((day) => (
                                        <th
                                            key={day.date}
                                            className='sticky bg-white border border-gray-300 px-4 py-2 top-0'
                                        >
                                            <p className="font-semibold">{day.dayOfWeek}</p>
                                            <p className="font-normal">{timeUtil.formatDate(day.date)}</p>

                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="table-body font-normal pt-4">
                                {searchUtil.filteredData.map((schedule, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-200 px-4 py-2 w-2/12 text-start min-h-30">
                                            <div className="flex gap-x-4">
                                                <Avatar src={schedule.employee.user.image} />
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-gray-600">{schedule.employee.user.firstname} {schedule.employee.user.lastname}</p>
                                                    <p className="text-gray-400">00:00</p>
                                                </div>
                                            </div>
                                        </td>
                                        {weekDays.map((day) => {
                                            const shiftForDay = schedule.shifts.find(
                                                (shift: Shift) => timeUtil.formatDate(shift.date) == timeUtil.formatDate(day.date)
                                            );

                                            return (
                                                <td
                                                    key={day.date}
                                                    className="border border-gray-200 p-1 w-1/12 h-16 cursor-pointer group"
                                                    onClick={(e) => {
                                                        const target = e.target as HTMLElement;

                                                        setPopoverEvent({
                                                            hasEvent: (shiftForDay) ? true : false,
                                                            scheduleId: schedule._id || "",
                                                            date: new Date(day.date),
                                                            shift: (shiftForDay) ? shiftForDay : null,
                                                            position: {
                                                                top: target.getBoundingClientRect().top + 20 + window.scrollY,
                                                                left: target.getBoundingClientRect().left + window.scrollX,
                                                            }
                                                        });

                                                        setIsOpenEventPopover(true);

                                                    }}
                                                >
                                                    <div className="h-24">
                                                        {shiftForDay ? (
                                                            <WorkShiftBadge
                                                                openDeleteEvent={() => setIsOpenModalDeleteEvent(true)}
                                                                openEditEvent={() => setIsOpenEditEventModal(true)}
                                                                color={shiftForDay.position.color}
                                                                title={shiftForDay.title || ""}
                                                                startTime={shiftForDay.startTime}
                                                                endTime={shiftForDay.endTime}
                                                            />
                                                        ) : (

                                                            <button
                                                                onClick={() => { setIsOpenEventPopover(false), setIsOpenEventModal(true) }}
                                                                className="hover:text-green-300 hidden rounded-lg group-hover:flex justify-center items-center w-full h-full border border-green-300"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>

                                                            </button>

                                                        )}
                                                    </div>

                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                </div>





            </div>
            {isOpenAddEmployeeModal == true && <EmployeeSelectionModal onSelectEmployee={(employeeId: string) => addEmpployee(employeeId)} onClose={() => setIsOpendAddEmployeeModal(false)} employees={unaddedEmployees} />
            }
            {isOpenModalDeleteEvent && popoverEvent && popoverEvent.shift?._id && <ConfirmModal
                isOpen={isOpenModalDeleteEvent}
                onClose={() => setIsOpenModalDeleteEvent(false)}
                onConfirm={() => handleDeleteShift(popoverEvent?.shift?._id || "")}
                message="Are you sure you want to delete this event?"
            />}
            {isOpenEditEventModal && popoverEvent && popoverEvent.shift && <EditEventModal shift={popoverEvent?.shift} scheduleId={""} onClose={() => { setIsOpenEditEventModal(false) }} />}
            {isOpenEventModal && <AddEventModal scheduleId={popoverEvent?.scheduleId || ""} initialDate={popoverEvent?.date || new Date} onSave={() => { }} onClose={() => { setIsOpenEventModal(false) }} />}
        </>
    )
}
