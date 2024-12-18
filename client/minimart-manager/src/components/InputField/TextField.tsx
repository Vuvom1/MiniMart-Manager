import React, { useState } from "react";

interface TextFieldProps {
  id?: string;
  label?: string;
  name?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  value?: string;
  initialValue?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  height?: string;
  width?: string;
  error?: string | null;
  validations?: Array<(value: string) => string | null>;
  validationPassed?: (isValid: boolean) => void;
  multiline?: boolean;
  rows?: number;
}

export default function TextField({
  id,
  label,
  name,
  prefix,
  suffix,
  initialValue = "",
  value = initialValue,
  onChange,
  placeholder,
  height = "40px",
  width = "100%",
  error = null,
  validations = [],
  validationPassed,
  multiline = false,
  rows = 1,
}: TextFieldProps) {
  const [internalError, setInternalError] = useState<string | null>(error);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    if (isValid) setInternalError(null);
  };

  return (
    <div style={{ width }}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {prefix}
          </div>
        )}
        {multiline ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows}
            className={`block w-full rounded-md border-0 py-1.5 ${
              prefix ? "pl-10" : "pl-3"
            } ${
              suffix ? "pr-10" : "pr-4"
            } text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 text-left`}
            style={{ height }}
          />
        ) : (
          <input
            id={id}
            name={name}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`block w-full rounded-md border-0 py-1.5 ${
              prefix ? "pl-10" : "pl-3"
            } ${
              suffix ? "pr-10" : "pr-4"
            } text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 text-left`}
            style={{ height }}
          />
        )}
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {suffix}
          </div>
        )}
      </div>
      {(internalError || error) && (
        <p className="text-xs text-red-500">{internalError || error}</p>
      )}
    </div>
  );
}
