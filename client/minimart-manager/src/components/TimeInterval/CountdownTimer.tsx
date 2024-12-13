import React, { useState, useEffect } from 'react';
import Interval from '../../utils/Interval';

const CountdownTimer: React.FC<{ endTime: Date }> = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState<number>(endTime.getTime() - new Date().getTime());

    useEffect(() => {
        const interval = new Interval(endTime, setTimeLeft);
        interval.start();

        return () => interval.stop();
    }, [endTime]);

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className='flex gap-x-2 text-red-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p className='text-2xl font-medium'>{formatTime(timeLeft)}</p>
        </div>
    );
};

export default CountdownTimer;