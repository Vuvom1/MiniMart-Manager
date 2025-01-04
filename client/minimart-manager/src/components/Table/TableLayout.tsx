import React, { useState } from 'react';
import TextField from '../InputField/TextField';
import RoundedButton from '../Button/RoundedButton';
import RoundedIcon from '../Icon/RoundedIcon';
import useSearch from '../../utils/SearchUtil';
import { ColumnData } from '../../data/ColumnData/ColumnData';
import NestedValueUtil from '../../utils/NestedValueUtil';
import { ColumnType } from '../../constant/enum';
import { StatusBadge } from '../Badge/StatusBadge';
import { TimeUtil } from '../../utils/TimeUtil';
import Avatar from '../Avatar';

interface TableLayoutProps {
    title: string;
    data: any[];
    columns: ColumnData[];
    seeAll?: () => void;
    addItem?: () => void;
    itemsPerPageOptions?: number[];
    action?: (id: string) => void;
}

const TableLayout: React.FC<TableLayoutProps> = ({
    title,
    data,
    columns = [],
    seeAll,
    addItem,
    itemsPerPageOptions = [5, 10, 20],
    action,
}) => {
    const timeUtil = new TimeUtil();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.length > 0 ? data.slice(startIndex, endIndex) : [];

    const { searchTerm, handleSearchChange, filteredData } = useSearch(currentItems);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
    };

    return (
        <div className={`flex flex-col bg-white shadow-md rounded-lg p-4 h-full`}>
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
                    <TextField
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search here..."
                        prefix={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        } />

                    {seeAll && <RoundedButton onClick={seeAll} suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>} label='See All' width='180px' />}

                    {addItem && <RoundedButton color='bg-cyan-500 text-white' width='200px' label={"Add new"} onClick={addItem} prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>} />}
                </div>
            </div>

            <div className='flex-auto h-[calc(100%-100px)] grow overflow-auto rounded-lg'>

                <table className="min-w-full bg-white text-center items-center rounded-lg shadow-md">
                    <thead className='bg-gray-100 sticky top-0 '>
                        <tr className='rounded-md'>
                            {columns.map((column, index) => (

                                <th key={index} className={`px-4 py-2 text-gray-500 font-semibold ${(column.type === ColumnType.STATUS || column.type === ColumnType.CHECK) ? 'text-center' : 'text-start'} bg-gray-100`}>
                                    {column.header}
                                </th>
                            ))}
                            <th className='px-4 py-2'></th>
                        </tr>

                    </thead>
                    <tbody className="table-body font-normal">
                        {filteredData.length === 0 ? (
                            <div>

                            </div>
                        ) :
                            filteredData.map((item) => (

                                <tr
                                    key={`${item.id}-row`}
                                    className={`border-t border-gray-200 cursor-pointer hover:bg-gray-50`}

                                >
                                    {columns.map((column, index) => (
                                        <td key={index} className="px-4 py-4 border-b border-gray-200 ">
                                            {(() => {
                                                switch (column.type) {
                                                    case ColumnType.ID:
                                                        return (
                                                            <span className="flex gap-x-2 items-center">
                                                                <button
                                                                    className="ml-2 p-1 border w-6 h-6 rounded hover:bg-gray-300"
                                                                    onClick={() => handleCopyId(item[column.field])}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                                                    </svg>
                                                                </button>
                                                                {item[column.field].slice(0, 8) + '...'}
                                                            </span>
                                                        );
                                                    case ColumnType.IMAGE:
                                                        return (
                                                            <div className='justify-start flex'>
                                                                <Avatar src={item[column.field]} />
                                                            </div>
                                                        );
                                                    case ColumnType.STATUS:
                                                        return (
                                                            <div className='justify-center flex'>
                                                                <StatusBadge value={item[column.field]} mapping={column.colorMapping || 'N/A'} />
                                                            </div>
                                                        );
                                                    case ColumnType.DATETIME:
                                                        return (
                                                            <div className='justify-start flex'>
                                                                <p>{timeUtil.convertIsoDateToTimeAndDate(NestedValueUtil.getNestedValue(item, column.field))}</p>
                                                            </div>
                                                        );
                                                    case ColumnType.DATE:
                                                        return (
                                                            <div className='justify-start flex'>
                                                                <p>{timeUtil.convertToDayMonthYearShort(NestedValueUtil.getNestedValue(item, column.field))}</p>
                                                            </div>
                                                        );
                                                    default:
                                                        return (
                                                            <div className='justify-start flex'>
                                                                {NestedValueUtil.getNestedValue(item, column.field) ?? 'N/A'}
                                                            </div>
                                                        );
                                                }
                                            })()}
                                        </td>
                                    ))}

                                    <td className='px-4 py-4 border-b' onClick={() => action && action(item._id)}>
                                        <span className="flex p-2 w-fit rounded-md items-center hover:bg-cyan-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                        </span>

                                    </td>

                                </tr>

                            ))}


                    </tbody>

                </table>

            </div>



            <div className="flex justify-between my-4">

                <div className="flex items-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={`${index + 1}-paginate`}
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

export default TableLayout;
``