import React from 'react';
import { statusStyleMapping } from '../../constant/mapping';

interface StatusBadgeProps {
    value: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ value }) => {
    return (
        <span className={`${statusStyleMapping[value] || "bg-gray-200 text-gray-800"} border rounded`}>
            {value}
        </span>
    );
};
