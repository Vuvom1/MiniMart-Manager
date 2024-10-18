interface RoundedIcon {
  icon: JSX.Element,
  color?: string, 
  bgColor?: string,
  width?: string,
  heigh?: string,
}

function RoundedIcon ({ 
  icon, 
  color = "white",
  bgColor = "bg-cyan-500", 
  width = "40px",
  heigh= "40px",
} : RoundedIcon) {
  return (
    <div
    style={{width: width, height: heigh}}
     className={`flex items-center rounded-md justify-center ${bgColor} text-${color}`}>
      {icon}
    </div>
  );
};

export default RoundedIcon;