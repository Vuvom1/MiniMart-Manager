import React from 'react';
import { ColorUtil } from '../../utils/ColorUtil';

interface StatusBadgeProps {
    value: string;
    mapping: Record<string, string>; 
    defaultStyle?: string; 
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ value, mapping, defaultStyle }) => {
    const colorUtil = new ColorUtil();
    const textColor = colorUtil.getStrongerColor(mapping[value] || defaultStyle || "gray-200")

    return (
        <span className={`bg-${mapping[value] || defaultStyle || "gray-200"} text-${textColor} rounded-lg px-4 py-1`}>
            {value}
        </span>
    );
};
