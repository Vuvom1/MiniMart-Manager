import React from 'react';

interface CircleIcon {
  icon: JSX.Element,
  color?: string, 
  bgColor?: string,
  size?: string,
}

function CircleIcon ({ 
  icon, 
  color = "white",
  bgColor = "bg-blue-500", 
  size = "w-12 h-12" } : CircleIcon) {
  return (
    <div className={`flex items-center justify-center ${bgColor} ${size} text-${color} rounded-full`}>
      {icon}
    </div>
  );
};

export default CircleIcon;