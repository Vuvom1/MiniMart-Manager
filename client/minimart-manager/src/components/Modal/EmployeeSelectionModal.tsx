import React, { useState } from 'react';
import TextField from '../InputField/TextField';
import useSearch from '../../utils/SearchUtil';
import { Employee } from '../../data/Entities/Employee';

interface EmployeeSelectionModalProps {
    employees: Employee[];
    onSelectEmployee: (employeeId: any) => void;
    onClose: () => void;
}

const EmployeeSelectionModal: React.FC<EmployeeSelectionModalProps> = ({ employees, onSelectEmployee, onClose }) => {

    const { searchTerm, handleSearchChange, filteredData } = useSearch(employees)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 max-w-md w-full">
                <h2 className="text-lg font-medium mb-4">Select Employee To Add Schedule</h2>
                <TextField 
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search here..."
                        prefix={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        } />
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
               

                    {filteredData.map((employee) => (
                        <div
                            key={employee.id}
                            className="flex justify-between p-2 border-b cursor-pointer"
                            onClick={() => {
                                onSelectEmployee(employee._id);
                                onClose();
                            }}
                        >
                            <div>
                                <h3 className="font-normal">{employee.firstname} {employee.lastname}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="text-blue-500">Close</button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSelectionModal;
