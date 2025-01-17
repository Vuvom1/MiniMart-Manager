import React, { useState } from 'react';

interface DateFieldProps {
  id?: string;
  label?: string;
  name?: string;
  prefix?: JSX.Element;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  height?: string;
  width?: string;
  error?: string | null;
  validations?: Array<(value: string) => string | null>; 
  validationPassed?: (isValid: boolean) => void; 
  
}

export default function DateField({
  id,
  label,
  name,
  prefix,
  value,
  onChange,
  placeholder,
  height = '40px',
  width = '100%',
  error = null,
  validations = [],
  validationPassed,
}: DateFieldProps) {
  const [internalError, setInternalError] = useState<string | null>(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (onChange) {
      onChange(e);
    }

    let isValid = true;

    for (const validate of validations) {
      const validationError = validate(inputValue);
      if (validationError) {
        setInternalError(validationError);
        isValid = false;
        break;
      }
    }

    if (validationPassed) {
      validationPassed(isValid);
    }

    if (isValid) {
      setInternalError(null); 
    }
  };

  return (
    <div style={{ width }}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm" style={{ height }}>
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {prefix}
          </div>
        )}
        <input
          id={id}
          name={name}
          type="date"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`block w-full rounded-md border-0 py-1.5 ${
            prefix ? 'pl-10' : 'pl-3'
          } pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          style={{ height }}
        />
         {(internalError || error) && <p className='text-xs' style={{ color: 'red' }}>{internalError || error}</p>}
      </div>
    </div>
  );
}
