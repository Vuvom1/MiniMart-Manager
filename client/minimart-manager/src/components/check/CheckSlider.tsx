import React, { useState } from "react";

interface CheckSliderProps {
  initialValue?: boolean;
  label?: string;
  onValueChange?: (value: boolean) => void;
  width?: string;
  height?: string;
  labelColor?: string;
  style?: string;
}

export const CheckSlider: React.FC<CheckSliderProps> = ({
  initialValue = false,
  label = "",
  onValueChange,
  width = "60px",
  height = "30px",
  labelColor = "text-white",
  style = "rounded-full",
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${labelColor}`}>
      {label && <span className="text-sm">{label}</span>}
      <div
        className={`flex items-center border border-cyan-500 p-0.5 cursor-pointer ${style}`}
        style={{ width, height }}
        onClick={handleChange}
      >
        <div
          className={`flex items-center justify-between h-full w-full rounded-full relative transition-all duration-300 bg-transparent`}
        >
          <div
            className={`w-1/2 h-full rounded-full transition-transform duration-300 ${
              value ? "transform translate-x-full bg-cyan-500" : "bg-gray-400"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};
