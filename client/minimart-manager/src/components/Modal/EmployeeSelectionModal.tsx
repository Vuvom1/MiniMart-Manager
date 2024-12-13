import React, { useState } from 'react';
import TextField from '../InputField/TextField';
import useSearch from '../../utils/SearchUtil';
import { Employee } from '../../data/Entities/Employee';
import RoundedButton from '../Button/RoundedButton';

interface EmployeeSelectionModalProps {
    employees: Employee[];
    onSelectEmployee: (employeeId: any) => void;
    onClose: () => void;
}

const EmployeeSelectionModal: React.FC<EmployeeSelectionModalProps> = ({ employees, onSelectEmployee, onClose }) => {

    const { searchTerm, handleSearchChange, filteredData } = useSearch(employees)


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-white rounded-lg p-4 min-w-[40%] min-h-[50%] max-w-md w-full">
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
                <div className="flex flex-col gap-2 grow overflow-y-auto">
                    {
                        filteredData.length == 0 ? (<div className='flex items-center mt-8 justify-center'>
                            <p className='text-gray-400'>There is no employee to add or all employee is added to schedule</p>
                        </div>) : filteredData.map((employee) => (
                        <div
                            key={employee.id}
                            className="flex justify-between max-h-50 px-2 py-6 border-b cursor-pointer"
                            onClick={() => {
                                onSelectEmployee(employee._id);
                                onClose();
                            }}
                        >
                            <div>
                                <h3 className="font-normal">{employee.user.firstname} {employee.user.lastname}</h3>
                            </div>
                        </div>
                    ))
                    }

                  
                </div>
                <div className="flex justify-end mt-4">
                    <RoundedButton onClick={onClose} label='Cancel'/>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSelectionModal;
