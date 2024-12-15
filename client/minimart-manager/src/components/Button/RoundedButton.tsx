import React from 'react';

interface RoundedButtonProps {
  label: string;
  onClick?: () => void;
  color?: string; 
  size?: 'small' | 'medium' | 'large'; 
  borderColor?: string; 
  border?: string;
  height?: string; 
  width?: string;  
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  disable?: boolean;
  rounded?: string;
  textColor?: string;
  type?: 'button' | 'submit' | 'reset'; // Add this line
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  label,
  onClick,
  color = 'transparent', 
  size = 'medium', 
  borderColor = 'transparent', 
  border = 'border',
  height = '40px', 
  width = 'auto',  
  prefixIcon, 
  suffixIcon,
  disable = false,
  rounded = 'rounded-md',
  textColor = 'text-black',
  type = 'button' // Add this line
}) => {
 
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type} // Add this line
      disabled={disable}
      onClick={onClick}
      style={{ height, width }}
      className={`${rounded} items-center justify-center gap-x-2 shadow-sm flex ${color} ${sizeClasses[size]} ${border} ${borderColor} ${textColor} transition duration-200 hover:bg-opacity-90 focus:outline-none`}
    >
      {prefixIcon}
      {label}
      {suffixIcon}
    </button>
  );
};

export default RoundedButton;
