import React, { useState } from 'react';

interface ColorPickerProps {
  label?: string;
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  validations?: Array<(color: string) => string | null>;
  validationPassed?: (isValid: boolean) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  colors,
  selectedColor,
  onChange,
  validations = [],
  validationPassed,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleColorClick = (color: string) => {
    let isValid = true;

    for (const validate of validations) {
      const validationError = validate(color);
      if (validationError) {
        setError(validationError);
        isValid = false;
        break;
      }
    }

    if (validationPassed) {
      validationPassed(isValid);
    }

    if (isValid) {
      setError(null);
      onChange(color);
      setIsPickerOpen(false);
    }
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          {label}
        </label>
      )}

      <div
        className="flex w-20 h-10 px-2 py-1.5 rounded-md gap-x-4 border cursor-pointer"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
      >
        <div className={`w-6 h-6 rounded-md bg-${selectedColor}`}></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {isPickerOpen && (
        <div className="absolute w-max z-10 bg-white border mt-2 p-6 rounded shadow-lg">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'
                  } bg-${color}`}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default ColorPicker;
