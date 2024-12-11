import React, { useState } from 'react';
import FormatUtil from '../../utils/FormatUttil';

interface MoneyFieldProps {
  id?: string;
  label?: string;
  name?: string;
  prefix?: JSX.Element;
  suffixIcon?: JSX.Element;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  height?: string;
  width?: string;
  error?: string | null;
}

const MoneyField: React.FC<MoneyFieldProps> = ({
  id,
  label,
  name,
  prefix,
  suffixIcon,
  value = 0.00,
  onChange,
  placeholder,
  height = '50px',
  width = '100%',
  error = null,
}) => {
  const [currentValue, setCurrentValue] = useState<string>(FormatUtil.moneyFormat(value.toString()));

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = FormatUtil.moneyFormat(inputValue);
    setCurrentValue(formattedValue);
    const decimalValue = parseFloat(inputValue.replace(/,/g, ''));
    if (!isNaN(decimalValue)) {
      onChange?.({ target: { value: decimalValue.toFixed(2) } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div style={{ width }}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className={`relative rounded-md border ${error ? 'border-red-500' : 'border-gray-300'}`} style={{ height }}>
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {prefix}
          </div>
        )}
        <input
          type="text"
          id={id}
          name={name}
          value={currentValue}
          onChange={handleMoneyChange}
          placeholder={placeholder}
          className={`block w-full pl-7 pr-12 pb-1 sm:text-sm`}
          style={{ height }}
        />
        {suffixIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffixIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default MoneyField;
