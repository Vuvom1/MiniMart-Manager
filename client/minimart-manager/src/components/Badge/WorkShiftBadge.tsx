import { useState, useEffect, useRef } from "react";
import { TimeUtil } from "../../utils/TimeUtil";
import { ColorUtil } from "../../utils/ColorUtil";

type WorkShiftBadgeProps = {
    title: string;
    startTime?: string;
    endTime?: string;
    color?: string;
    displayAction?: boolean;
    openEditEvent?: () => void;
    openDeleteEvent?: () => void;
};

export const WorkShiftBadge: React.FC<WorkShiftBadgeProps> = ({
    title = "",
    startTime = "",
    endTime = "",
    color = "bg-blue-200",
    displayAction = true,
    openEditEvent,
    openDeleteEvent,
}) => {
    const [actionVisible, setActionVisible] = useState(false);
    const actionRef = useRef<HTMLDivElement>(null);
    const timeUtil = new TimeUtil();
    const colorUtil = new ColorUtil();
    const textColor = colorUtil.getStrongerColor(color);

    const handleActionClick = () => {
        setActionVisible(!actionVisible);
    };

    const handleEditClick = () => {
        if (openEditEvent) {
            openEditEvent();
        }
        setActionVisible(false);
    };

    const handleDeleteClick = () => {
        if (openDeleteEvent) {
            openDeleteEvent();
        }
        setActionVisible(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (actionRef.current && !actionRef.current.contains(event.target as Node)) {
            setActionVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`flex rounded-lg gap-x-2 text-sm shadow h-full py-2 bg-${color}`}>
            <div className={`w-1 rounded-full ml-2 bg-${textColor} `}>
            </div>
            <div className={`flex flex-col w-full pr-4 justify-between text-${textColor}`}>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p className={`font-semibold text-left text-ellipsis overflow-hidden`}>{title}</p>
                    </div>
                    {displayAction && (
                        <div className="relative" ref={actionRef}>
                            <button
                                className="flex items-center justify-center rounded-full hover:bg-gray-200"
                                onClick={handleActionClick}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                </svg>
                            </button>
                            {actionVisible && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <ul className="py-1">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black" onClick={handleEditClick}>Edit</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDeleteClick}>Delete</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <p className={`pb-2 text-left `}>{startTime} - {endTime}</p>
                <p className="flex justify-end">{timeUtil.timeDifference(startTime, endTime)}</p>
            </div>
        </div>
    );
};
