import { useEffect, useRef, useState } from "react";
import { WorkShiftBadge } from "../../components/Badge/WorkShiftBadge";
import RoundedButton from "../../components/Button/RoundedButton";
import { getAllEmployees } from "../../services/api/EmployeeApi";
import { addEmployeeToSchedule, getAllSchedules } from "../../services/api/ScheduleApi";
import toast from "react-hot-toast";
import SuccessToast from "../../components/Toast/SuccessToast";
import EmployeeSelectionModal from "../../components/Modal/EmployeeSelectionModal";
import CustomErrorToast from "../../components/Toast/ErrorToast";
import { Schedule } from "../../data/Entities/Schedule";
import { TimeUtil } from "../../utils/TimeUtil";
import AddEventModal from "../../components/Modal/AddEventModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import Avatar from "../../components/Avatar";
import EditEventModal from "../../components/Modal/EditEventModal";
import { Shift } from "../../data/Entities/Shift";
import { deleteShift } from "../../services/api/ShiftApi";
import { Employee } from "../../data/Entities/Employee";


export function ScheduleManagement() {
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

    const handleDeleteShift= async (shiftId: string) => {
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

                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 ">Work Schedules</h1>
                    <div className="flex gap-x-4">


                    </div>

                </div>

                <div className="flex justify-between">
                    <div className="flex gap-x-2">
                        <RoundedButton onClick={() => setWeekDays(timeUtil.getPrevWeekDays(weekDays))} label="" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        } />
                        <p className="text-2xl self-center text-gray-500">{timeUtil.formatDateToDayMonthYear(weekDays[0]?.date) } - {timeUtil.formatDateToDayMonthYear(weekDays[weekDays.length-1]?.date) } </p>
                        <RoundedButton onClick={() => setWeekDays(timeUtil.getNextWeekDays(weekDays))} label="" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>

                        } />
                    </div>

                    <RoundedButton onClick={() => setIsOpendAddEmployeeModal(true)} label="Add Employee To Scheduling" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                    </svg>
                    } color="text-white bg-cyan-500" />
                </div>

                <div className="grow overflow-y-auto max-h-[calc(100vh-220px)] rounded-lg">
                    <table className="table-auto w-full table-layout-fixed bg-white text-center items-center grow rounded-lg shadow-md">
                        <thead className="table-header sticky rounded-l-lg top-0 border-2">
                            <tr className="rounded-md">
                                <th className="sticky bg-white border rounded-l-lg border-gray-300 px-4 py-8">
                                    Employee
                                </th>
                                {weekDays.map((day, index) => (
                                    <th
                                        key={day.date}
                                        className={`sticky bg-white border border-gray-300 px-4 py-2 top-0 ${index === weekDays.length - 1 && "rounded-r-lg"
                                            }`}
                                    >
                                        <p className="font-semibold">{day.dayOfWeek}</p>
                                        <p className="font-normal">{timeUtil.formatDate(day.date)}</p>

                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="table-body font-normal pt-4">
                            {schedules.map((schedule, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-200 px-4 py-2 w-2/12 text-start min-h-30a">
                                        <div className="flex gap-x-4">
                                            <Avatar src={schedule.employee.user.image} />
                                            <div className="flex flex-col">
                                                <p className="font-semibold">{schedule.employee.user.firstname} {schedule.employee.user.lastname}</p>
                                                <p className="text-gray-500">00:00</p>
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
                                                className="border border-gray-200 p-1 w-1/12 cursor-pointer"
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
                                                {shiftForDay ? (
                                                    <WorkShiftBadge
                                                        color={shiftForDay.position.color}
                                                        title={shiftForDay.title||""}
                                                        startTime={shiftForDay.startTime}
                                                        endTime={shiftForDay.endTime}
                                                    />
                                                ) : (
                                                    <div className="py-8 text-gray-400">
                                                        <p>Available</p>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
            {isOpenAddEmployeeModal == true && <EmployeeSelectionModal onSelectEmployee={(employeeId: string) => addEmpployee(employeeId)} onClose={() => setIsOpendAddEmployeeModal(false)} employees={unaddedEmployees} />
            }
            {popoverEvent && isOpentEventPopover == true && (
                <div
                    ref={popoverRef}
                    className="popover bg-white p-4 shadow-lg rounded-lg absolute z-10"
                    style={{
                        top: `${popoverEvent.position.top}px`,
                        left: `${popoverEvent.position.left}px`,
                    }}
                >
                    <div className="flex flex-col text-left">
                        {popoverEvent.hasEvent == false && <button
                            onClick={() => { setIsOpenEventPopover(false), setIsOpenEventModal(true) }}
                            className="hover:text-red-700"
                        >
                            <div className="flex gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <p>Add Event</p>
                            </div>

                        </button>}

                        {popoverEvent.hasEvent == true && (<><button
                            onClick={() => { setIsOpenEventPopover(false), setIsOpenEditEventModal(true) }}
                            className="hover:text-red-700"
                        >
                            <div className="flex gap-x-2 justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                <p> Edit Event</p>
                            </div>

                        </button>
                            <button
                                onClick={() => { handleDeleteEventClick(), setIsOpenEventPopover(false) }}
                                className="hover:text-red-700"
                            >
                                <div className="flex gap-x-2 justify-start"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                    <p>
                                        Delete Event
                                    </p>
                                </div>


                            </button>
                        </>

                        )}
                    </div>
                </div>
            )}

            {isOpenModalDeleteEvent && popoverEvent && popoverEvent.shift?._id && <ConfirmModal
                isOpen={isOpenModalDeleteEvent}
                onClose={() => setIsOpenModalDeleteEvent(false)}
                onConfirm={() => handleDeleteShift(popoverEvent?.shift?._id || "")}
                message="Are you sure you want to delete this event?"
            />}
            {isOpenEditEventModal && popoverEvent && popoverEvent.shift  && <EditEventModal shift={popoverEvent?.shift} scheduleId={""} onClose={()=> {setIsOpenEditEventModal(false)}} />}
            {isOpenEventModal && <AddEventModal scheduleId={popoverEvent?.scheduleId || ""} initialDate={popoverEvent?.date|| new Date} onSave={() => {}} onClose={() => { setIsOpenEventModal(false)}} />}
        </>
    )
}
