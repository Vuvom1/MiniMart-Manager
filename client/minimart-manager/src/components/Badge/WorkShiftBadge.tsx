import { useState } from "react";
import { TimeUtil } from "../../utils/TimeUtil";
import { ColorUtil } from "../../utils/ColorUtil";

type WorkShiftBadgeProps = {
    title: string;
    startTime?: string;
    endTime?: string;
    color?: string;
};

export const WorkShiftBadge: React.FC<WorkShiftBadgeProps> = ({
    title="",
    startTime = "",
    endTime = "",
    color = "bg-blue-200",
}) => {
    const timeUtil = new TimeUtil();
    const colorUtil = new ColorUtil();
    const textColor = colorUtil.getStrongerColor(color);

    return (
        <div className={`flex rounded gap-x-2 text-sm shadow h-full px-2 py-2 bg-${color}`}>
            <div className={`w-1 rounded-full ml-2 bg-${textColor} `}>

            </div>
            <div className={`flex flex-col justify-between text-${textColor}`}>  
                <p className={`font-semibold text-left`}>{title}</p>
                <p className={`pb-4 text-left `}>{startTime} - {endTime}</p>
                <p className="flex justify-end">{timeUtil.timeDifference(startTime, endTime)}</p> 
            </div>

        </div>
    );
};
