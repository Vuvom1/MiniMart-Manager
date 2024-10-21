import React, { useState } from 'react';
import TextField from '../InputField/TextField';
import RoundedButton from '../Button/RoundedButton';
import RoundedIcon from '../Icon/RoundedIcon';

interface ItemsProps {
    title: string;
    itemData: any[];
    columnHeaders: string[];
    dataFields: string[];
    seeAll?: () => void;
    addItem?: () => void;
    itemsPerPageOptions?: number[]; // Options for items per page
}

const ExpendableRowTable: React.FC<ItemsProps> = ({
    title,
    itemData,
    columnHeaders,
    dataFields,
    seeAll,
    addItem,
    itemsPerPageOptions = [5, 10, 20], // Default options for items per page
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
    const [expandedRows, setExpandedRows] = useState<number[]>([]); // State for expanded rows

    const totalPages = Math.ceil(itemData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = itemData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value)); // Update items per page
        setCurrentPage(1); // Reset to the first page
    };

    const toggleRow = (id: number) => {
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 h-full">
            <div className='flex mb-4 items-center justify-between'>
                <div className='flex gap-x-4 items-center justify-between'>
                    <RoundedIcon icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                        <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    } />
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>

                <div className='flex gap-x-4'>
                    <TextField placeholder="Search here..."
                        prefix={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        } />

                    {seeAll && <RoundedButton onClick={seeAll} suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>} label='See All' width='150px' />}

                    {addItem && <RoundedButton color='bg-cyan-500 text-white' label={title} onClick={addItem} prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>} />}
                </div>
            </div>

            <table className="flex-auto min-w-full bg-white text-center items-center grow">
                <thead className='table-header'>
                    <tr className='rounded-md'>
                        {columnHeaders.map((header, index) => (
                            <th key={index} className="px-4 py-2 text-gray-500 font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='table-body font-semibold'>
                    {currentItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr className="border-t border-gray-200 cursor-pointer" onClick={() => toggleRow(item._id)}>
                                {dataFields.map((field, fieldIndex) => (
                                    <td key={fieldIndex} className="px-4 py-4">
                                        {field === "_id" ? (
                                            <span className="relative group">
                                                {item[field].slice(0, 8) + '...'}
                                                <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg">
                                                    {item[field]}
                                                </span>
                                            </span>
                                        ) : (
                                            item[field]
                                        )}
                                    </td>
                                ))}
                            </tr>
                            {expandedRows.includes(item._id) && (
                                <tr className="bg-gray-50">
                                    <td colSpan={dataFields.length} className="px-4 py-2 text-left">
                                        {/* Replace with actual details to show */}
                                        <div>
                                            <strong>Details:</strong>
                                            <pre>{JSON.stringify(item, null, 2)}</pre>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between my-4">
                <div className="flex items-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`px-3 mx-1 py-1 rounded ${currentPage === index + 1 ? 'bg-cyan-500 text-white' : 'bg-white border border-black'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExpendableRowTable;
