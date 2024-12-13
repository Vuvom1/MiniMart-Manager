import React, { useState, useRef, useEffect } from 'react';
import { Period } from '../constant/enum';

interface ComboBoxProps {
  options: string[] | Period[];
  placeholder?: string;
  onSelect: (option: string | Period) => void;
  width?: string;
  height?: string;
  prefixIcon?: JSX.Element
}

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  placeholder = "Select...",
  onSelect,
  width = '100%',
  height = '40px',
  prefixIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [searchValue, setSearchValue] = useState(options[0]);
  const comboBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboBoxRef.current && !comboBoxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value) {
      setFilteredOptions(options.filter(option => option.toLowerCase().includes(value.toLowerCase())));
    } else {
      setFilteredOptions(options);
    }
  };

  const handleOptionClick = (option: any) => {
    onSelect(option);
    setSearchValue(option);
    setIsOpen(false);
  };

  const toggleComboBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={comboBoxRef} style={{ width, height }}>
      <div className="flex px-2 items-center bg-white justify-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-cyan-500">
      {prefixIcon && prefixIcon}
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        onClick={toggleComboBox}
        placeholder={placeholder}
        className="w-full p-2 outline-none rounded-full"
        style={{ height }}
      />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
      </div>

      {isOpen && (
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-auto">
        {filteredOptions.length > 0 ? (
        filteredOptions.map((option, index) => (
          <div
          key={index}
          onClick={() => handleOptionClick(option)}
          className="px-4 py-2 cursor-pointer hover:bg-blue-100 rounded-lg"
          >
          {option}
          </div>
        ))
        ) : (
        <div className="px-4 py-2 text-gray-500 rounded-full">No results found</div>
        )}
      </div>
      )}
    </div>
  );
};

export default ComboBox;
