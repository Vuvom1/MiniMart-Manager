import { useEffect, useState } from 'react';
import Select from 'react-select';

interface SelectFieldProps {
  id?: string;
  label?: string;
  name?: string;
  value?: { label: string; value: string } | null;
  initialValue?: { label: string; value: string } | null;
  onChange?: (selectedOption: { label: string; value: string } | null) => void;
  placeholder?: string;
  width?: string;
  error?: string | null;
  options: { value: any; label: string}[]; 
  prefixIcon?: JSX.Element;
}

export default function SelectField({
  id,
  label,
  name,
  initialValue,
  value,
  onChange,
  placeholder = "Select an option",
  width = '100%',
  error = null,
  options,
  prefixIcon,
}: SelectFieldProps) {
  const [selectedValue, setSelectedValue] = useState<{ label: string; value: string } | null>(
    initialValue || null
  );

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (selectedOption: { label: string; value: string } | null) => {
    setSelectedValue(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div style={{ width }}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm focus-within:ring-2 focus-within:ring-cyan-500">
        {prefixIcon && prefixIcon}
        <Select
          id={id}
          name={name}
          value={selectedValue}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          classNamePrefix="react-select" 
          styles={{
        control: (provided) => ({
          ...provided,
          borderColor: error ? 'red' : provided.borderColor,
          boxShadow: error ? '0 0 0 1px red' : provided.boxShadow,
        }),
          }}
        />
        {error && <p className="text-xs" style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}
