import React, { useState } from 'react';
import { Popover } from '@headlessui/react';
import TextField from '../InputField/TextField';
import { ColorUtil } from '../../utils/ColorUtil';

interface StatusPickerModalProps<T extends string> {
  initialValue?: T;
  statusEnum: Record<string, T>;
  colorMapping: { [key in T]: string }; 
  onSelect: (value: T) => void; 
  placeholder?: string; 
}

const StatusPickerModal = <T extends string>({
  initialValue,
  statusEnum,
  colorMapping,
  onSelect,
  placeholder = 'Select Status',
}: StatusPickerModalProps<T>) => {
  const [selectedStatus, setSelectedStatus] = useState<T | null>(initialValue || null);
  const [searchTerm, setSearchTerm] = useState('');
  const colorUtil = new ColorUtil();

  const statusKeys = Object.values(statusEnum);

  const filteredStatuses = statusKeys.filter((status) =>
    status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectStatus = (status: T) => {
    setSelectedStatus(status);
    onSelect(status);
  };

  return (
    <Popover className="relative">
      <Popover.Button className="w-full">
        <div
          className={`flex gap-x-2 rounded-full py-1 px-6 w-fit items-center ${
            selectedStatus ? (`bg-${colorMapping[selectedStatus]} text-${colorUtil.getStrongerColor(colorMapping[selectedStatus])}` ): 'bg-gray-200 text-black'
          }`}
        >
          <p>{selectedStatus || placeholder}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-2 bg-white border rounded shadow-lg p-2">
        <div className="flex gap-x-2 mb-2">
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="300px"
            placeholder="Search for status"
          />
        </div>
        <ul className="max-h-28 overflow-y-auto">
          {filteredStatuses.map((status) => (
            <li
              key={status}
              onClick={() => handleSelectStatus(status as T)}
              className="cursor-pointer p-2 hover:bg-gray-100 w-full"
            >
              <div className="flex gap-x-2 items-center">
                <div className={`w-4 h-4 rounded-full bg-${colorMapping[status as T]}`}></div>
                <p>{status}</p>
              </div>
            </li>
          ))}
        </ul>
      </Popover.Panel>
    </Popover>
  );
};

export default StatusPickerModal;
