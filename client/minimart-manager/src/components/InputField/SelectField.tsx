import Select from 'react-select';

interface SelectFieldProps {
  id?: string;
  label?: string;
  name?: string;
  value?: { label: string; value: string } | null;
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
  value,
  onChange,
  placeholder = "Select an option",
  width = '100%',
  error = null,
  options,
  prefixIcon,
}: SelectFieldProps) {
  return (
    <div style={{ width }}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {prefixIcon && prefixIcon}
        <Select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
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
