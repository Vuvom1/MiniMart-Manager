import React from 'react';
import TextField from './TextField';
import RoundedButton from './Button/RoundedButton';
import RoundedIcon from './Icon/RoundedIcon';

interface ItemsOverviewProps {
    title: string,
    itemData: any[];
    columnHeaders: string[];
    dataFields: string[];
}

const OverviewTable: React.FC<ItemsOverviewProps> = ({ title, itemData, columnHeaders, dataFields }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
            <div className='flex mb-4 items-center justify-between'>
                <div className='flex gap-x-4 items-center justify-between'>
                    <RoundedIcon icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                        <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    } />
                    <h2 className="text-xl font-bold ">{title}</h2>
                </div>

                <div className='flex'>
                    <TextField placeholder="Search here..."
                        prefix={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        } />

                    <RoundedButton suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    } label='See All' width='140px' />
                </div>


            </div>

            <table className="min-w-full bg-white text-center items-center">
                <thead className='table-header '>
                    <tr>
                        {columnHeaders.map((header, index) => (
                            <th key={index} className="px-4 py-2 text-gray-500 font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='table-body font-semibold'>
                    {itemData.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            {dataFields.map((field, fieldIndex) => (
                                <td key={fieldIndex} className="px-4 py-4">
                                    {item[field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OverviewTable;
