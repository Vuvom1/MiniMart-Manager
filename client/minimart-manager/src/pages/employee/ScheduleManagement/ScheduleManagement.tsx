import { ScheduleType } from "../../../constant/enum";
import IndividualSchedule from "./IndividualSchedule";
import { TeamSchedule } from "./TeamSchedule";
import { useState } from "react";

export function ScheduleManagement() {
    const [displayedSchedule, setDisplayedSchedule] = useState<ScheduleType>(ScheduleType.TEAM);

    return (
        <>
            <div className="flex flex-col gap-y-4 h-full">

                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 ">Work Schedules</h1>
                    <div className="flex bg-gray-300/50 w-fit rounded shadow">
                    <button
                        className={`px-4 py-2 transition-colors duration-300 ${displayedSchedule === ScheduleType.TEAM ? 'bg-cyan-500 text-white' : 'text-gray-800'} rounded`}
                        onClick={() => setDisplayedSchedule(ScheduleType.TEAM)}
                    >
                        Team
                    </button>
                    <button
                        className={`px-4 py-2 transition-colors duration-300 ${displayedSchedule === ScheduleType.INDIVIDUAL ? 'bg-cyan-500 text-white' : 'text-gray-800'} rounded`}
                        onClick={() => setDisplayedSchedule(ScheduleType.INDIVIDUAL)}
                    >
                        Individual
                    </button>
                </div>
                </div>
              {displayedSchedule === ScheduleType.TEAM ? <TeamSchedule/>:<IndividualSchedule/> }
            </div>
        </>
    )
}
