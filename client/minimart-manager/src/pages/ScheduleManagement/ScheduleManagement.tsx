import { useEffect, useState } from "react";
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


export function ScheduleManagement() {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [isOpenAddEmployeeModal, setIsOpendAddEmployeeModal] = useState(false);
    const timeUtil = new TimeUtil();
    const [weekDays, setWeekDays] = useState(timeUtil.getCurrentWeekDays());
    const [popoverEvent, setPopoverEvent] = useState<{
        scheduleId: string;
        shift: any;
        day: string;
        position: { top: number, left: number };
    } | null>(null);
    const [isOpentEventPopover, setIsOpenEventPopover] = useState(false);
    const [isOpenEventModal, setIsOpenEventModal] = useState(false);

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
            console.log(schedules)
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

    useEffect(() => {
        fetchSchedules();
        fetchEmployees();
    }, []);

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
                        <RoundedButton label="" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        } />
                        <p className="text-2xl self-center text-gray-500">Jul 11 - Jul 18 </p>
                        <RoundedButton label="" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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
                        <thead className="table-header sticky rounded-l-lg top-0">
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
                                    <td className="border border-gray-300 px-4 py-2 w-2/12 text-start">
                                        {schedule.employee.user.firstname} {schedule.employee.user.lastname}
                                    </td>
                                    {weekDays.map((day) => {
                                        const shiftForDay = schedule.scheduleDetails.find(
                                            (shift: any) => shift.dayOfWeek === day.dayOfWeek
                                        );
                                        return (
                                            <td
                                                key={day.date}
                                                className="border border-gray-300 p-1 w-1/12 cursor-pointer"
                                                onClick={(e) => {
                                                   
                                                        setPopoverEvent({
                                                            scheduleId: schedule.id || "",
                                                            shift: shiftForDay?.shift ,
                                                            day: day.dayOfWeek,
                                                            position: {
                                                                top: e.clientY + 10,
                                                                left: e.clientX + 10,
                                                            }
                                                        });

                                                        setIsOpenEventPopover(true);
                                                  
                                                }}
                                            >
                                                {shiftForDay && (
                                                    <WorkShiftBadge
                                                        textColor={shiftForDay.shift.style.textColor}
                                                        backgroundColor={shiftForDay.shift.style.backgroundColor}
                                                        name={shiftForDay.shift.name}
                                                        startTime={shiftForDay.shift.startTime}
                                                        endTime={shiftForDay.shift.endTime}
                                                    />
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
            {isOpenAddEmployeeModal == true && <EmployeeSelectionModal onSelectEmployee={(employeeId: string) => addEmpployee(employeeId)} onClose={() => setIsOpendAddEmployeeModal(false)} employees={employees} />
            }
            {popoverEvent && isOpentEventPopover==true && (
                <div
                    className="popover bg-white p-4 shadow-lg rounded-lg absolute z-10"
                    style={{
                        top: `${popoverEvent.position.top}px`,
                        left: `${popoverEvent.position.left}px`,
                    }}
                >
                    <div className="flex flex-col">
                    <button
                            onClick={() => { setIsOpenEventPopover(false), setIsOpenEventModal(true)}} 
                            className="hover:text-red-700"
                        >
                            Add Event
                        </button>
                        <button
                            onClick={() => setPopoverEvent(null)} 
                            className="text-red-500 hover:text-red-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {isOpenEventModal && <AddEventModal scheduleId={popoverEvent?.scheduleId || ""} date={popoverEvent?.day || ""} onClose={() => setIsOpenEventModal(false)} />}
        </>
    )
}
