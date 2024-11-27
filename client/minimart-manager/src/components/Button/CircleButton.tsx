interface CircleButtonProps {
  icon: JSX.Element;  
  onClick: () => void;
  size?: string;  
  bgColor?: string; 
  textColor?: string; 
  borderColor?: string; 
  borderWidth?: string;  
}

export default function CircleButton({
  icon,  
  onClick,
  size = '50px',  
  bgColor = 'white', 
  textColor = 'black',
  borderColor = 'black',  
  borderWidth = 'border',  
}: CircleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} ${borderWidth} ${borderColor} rounded-full flex items-center justify-center`}
      style={{ width: size, height: size }}
    >
      {icon}
    </button>
  );
}
