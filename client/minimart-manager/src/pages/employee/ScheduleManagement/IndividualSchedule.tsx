    import React, { useState } from 'react';
    import { addMonths, eachDayOfInterval, endOfMonth, format, isSameMonth, startOfMonth, subMonths } from 'date-fns';
import RoundedButton from '../../../components/Button/RoundedButton';
import { WorkShiftBadge } from '../../../components/Badge/WorkShiftBadge';

    const IndividualSchedule: React.FC = () => {
        const [currentDate, setCurrentDate] = useState(new Date());

        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        const days = eachDayOfInterval({ start, end });

        const handlePrevMonth = () => {
            setCurrentDate(subMonths(currentDate, 1));
        };

        const handleNextMonth = () => {
            setCurrentDate(addMonths(currentDate, 1));
        };

        return (
            <div className='bg-white w-full'>
                 <div className="flex space-x-4 p-4 items-center">
                 <RoundedButton onClick={handlePrevMonth} label="" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            } />
                        <span className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</span>
                        <RoundedButton onClick={handleNextMonth} label="" prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                            } />
                    </div>
                <div className="inline-flex flex-col space-y-1 items-start justify-start w-full p-10">
                    <div className="inline-flex space-x-28 items-start justify-start pr-24 h-full w-full">
                        {['Mon', 'Tue', 'Wes', 'Thir', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                            <p key={index} className="w-12 h-full text-md text-gray-800">{day}</p>
                        ))}
                    </div>
                    <div className="flex flex-col items-start justify-start">
                        {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
                            <div key={weekIndex} className="inline-flex items-center justify-start w-full h-full">
                                {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => (
                                    <div key={dayIndex} className={`flex flex-col items-start justify-start w-40 h-32 pl-2 pr-32 pt-2.5 border border-gray-200 ${!isSameMonth(day, currentDate) ? 'opacity-50' : ''} ${format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-blue-50' : ''}`}>
                                        <p className="text-sm font-medium text-gray-800">{format(day, 'dd')}</p>
                                        {/* <WorkShiftBadge title={''}/> */}
                                    </div>    ))}
                            </div>
                        ))}
                    </div>
                   
                </div>
            </div>
        );
    };

export default IndividualSchedule;