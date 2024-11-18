import { useState } from "react";
import { TimeUtil } from "../../utils/TimeUtil";

type WorkShiftBadgeProps = {
    name: string;
    startTime: string;
    endTime: string;
    backgroundColor?: string; 
    textColor?: string;      
};

export const WorkShiftBadge: React.FC<WorkShiftBadgeProps> = ({
    name,
    startTime,
    endTime,
    backgroundColor = "bg-blue-100", 
    textColor = "text-blue-600",     
}) => {
    const timeUtil = new TimeUtil();

    return (
        <div className={`flex flex-col justify-between rounded p-2 text-sm shadow h-full ${backgroundColor}`}>
            <p className={`font-semibold ${textColor}`}>{name}</p>
            <p className={`pb-4 ${textColor}`}>{startTime} - {endTime}</p>
            <p className="text-gray-700 flex justify-end px-4">{timeUtil.timeDifference(startTime, endTime)}</p>
        </div>
    );
};
 