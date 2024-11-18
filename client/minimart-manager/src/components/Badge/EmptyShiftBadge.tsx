import { useState } from "react";
import { TimeUtil } from "../../utils/TimeUtil";

type EmptyShiftBadgeProps = {
    backgroundColor?: string; 
    textColor?: string;      
};

export const EmptyShiftBadge: React.FC<EmptyShiftBadgeProps> = ({

    backgroundColor = "bg-blue-100", 
    textColor = "text-blue-600",     
}) => {
    return (
        <div className={`flex flex-col justify-between rounded p-2 text-sm shadow h-full ${backgroundColor}`}>
            <p className={`font-semibold ${textColor}`}>Available</p>
        </div>
    );
};
 