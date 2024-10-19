import React from 'react';

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
}: DateFieldProps) {
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
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-md border-0 py-1.5 ${
            prefix ? 'pl-10' : 'pl-3'
          } pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          style={{ height }}
        />
        {error != null && <p className='text-xs' style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}
