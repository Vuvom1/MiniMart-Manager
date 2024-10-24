import React from 'react';

interface RoundedButtonProps {
  label: string;
  onClick?: () => void;
  color?: string; 
  size?: 'small' | 'medium' | 'large'; 
  borderColor?: string, 
  border?: string,
  height?: string; 
  width?: string;  
  prefixIcon?: JSX.Element,
  suffixIcon?: JSX.Element,
  disable?: boolean,
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  label,
  onClick,
  color = 'transparent', 
  size = 'medium', 
  borderColor = 'transparent', 
  border = 'border',
  height = '40px', 
  width = '100%',  
  prefixIcon, 
  suffixIcon,
  disable = false
}) => {
 
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={disable}
      onClick={onClick}
      style={{ height, width }}
      className={`rounded-md items-center justify-center shadow-sm flex ${color} ${sizeClasses[size]} ${border} ${borderColor} transition duration-200 hover:bg-opacity-90 focus:outline-none`}
    >
      {prefixIcon}
      {label}
      {suffixIcon}
    </button>
  );
};

export default RoundedButton;
