import React from 'react';

interface CircleButton {
  icon: JSX.Element,
  bgColor?: string,
  size?: string,
}

function CircleIcon ({ 
  icon, 
  bgColor = "bg-blue-500", 
  size = "w-12 h-12" } : CircleButton) {
  return (
    <div className={`flex items-center justify-center ${bgColor} ${size} rounded-full`}>
      {icon}
    </div>
  );
};

export default CircleIcon;