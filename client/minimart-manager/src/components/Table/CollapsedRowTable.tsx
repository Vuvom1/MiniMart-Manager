import React, { useState } from 'react';
import TextField from '../InputField/TextField';
import RoundedButton from '../Button/RoundedButton';
import RoundedIcon from '../Icon/RoundedIcon';
import EditableInfo from '../Info/EditableInfo';
import useSearch from '../../utils/SearchUtil';
import { ColumnData } from '../../data/ColumnData/ColumnData';
import { StatusBadge } from '../Badge/StatusBadge';
import { ColumnType } from '../../constant/enum';
import StatusPickerModal from '../Picker/StatusPicker';
import { CheckSlider } from '../check/CheckSlider';

interface ItemsProps {
    statuses: Record<string, string>;
    title: string;
    itemData: any[];
    columnData: ColumnData[];
    seeAll?: () => void;
    addItem?: () => void;
    itemsPerPageOptions?: number[];
    onItemDataChange?: (updatedData: any[]) => void;
    onSave?: (updatedData: any) => void;
    onStatusChange?: (id: string, status: boolean) => void;
}

const CollapsedRowTable: React.FC<ItemsProps> = ({
    statuses,
    title,
    itemData,
    columnData = [],
    seeAll,
    addItem,
    itemsPerPageOptions = [5, 10, 20],
    onItemDataChange,
    onSave,
    onStatusChange,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
    const [expandedRows, setExpandedRows] = useState(-1);

    const totalPages = Math.ceil(itemData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = itemData.slice(startIndex, endIndex);
    const [modifiedItem, setModifiedItem] = useState<any>(null);

    const { searchTerm, handleSearchChange, filteredData } = useSearch(currentItems);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleValueChange = (index: number, field: string, newValue: string) => {

        const updatedItems = [...itemData];

        updatedItems[index][field] = newValue;
        setModifiedItem(updatedItems[index]);

        if (onItemDataChange) {
            onItemDataChange(updatedItems);
        }
    };

    const toggleRowExpansion = (index: number) => {
        if (expandedRows == index)
            setExpandedRows(-1);
        else
            setExpandedRows(index);

    };


    const handleSave = async () => {
        if (modifiedItem) {
            if (onSave) {
                onSave(modifiedItem);
            }
            setModifiedItem(null);
        } else {
            console.log("No changes to save");
        }

    };

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
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
                    </svg>} label='See All' width='150px' />}

                    {addItem && <RoundedButton color='bg-cyan-500 text-white' label={title} onClick={addItem} prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>} />}
                </div>
            </div>

            <table className="flex-auto min-w-full bg-white items-center grow rounded-lg overflow-hidden shadow-md">
                <thead className="table-header">
                    <tr className="rounded-md">
                        {columnData.map((column, index) => (
                            !column.isHidden &&
                            <th key={index} className={`px-4 py-2 text-gray-500 font-semibold ${(column.type === ColumnType.STATUS || column.type === ColumnType.CHECK) ? 'text-center' : 'text-start'} bg-gray-100`}>
                                {column.header}
                            </th>
                        ))}
                        <th className="px-4 py-2 text-gray-500 font-semibold bg-gray-100"></th>
                    </tr>
                </thead>
                <tbody className='table-body font-normal'>
                    {filteredData.map((item, index) => (
                        <>
                            <tr
                                key={`${item.id}-cl-row`}
                                className={`border-t border-gray-200 cursor-pointer hover:bg-gray-50`}

                            >
                                {columnData.map((column, columnIndex) => (
                                    !column.isHidden &&
                                    <td key={columnIndex} className="px-4 py-4 border-b border-gray-200">
                                        {column.type === ColumnType.ID ? (
                                            <span className="relative group flex gap-x-2 items-center">
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
                                        ) :
                                            (column.type === ColumnType.STATUS ? (
                                                <div className='justify-center flex'>
                                                    {column.isEditable && expandedRows == index ? (
                                                        <StatusPickerModal initialValue={item[column.field]} statusEnum={statuses} colorMapping={column.colorMapping} onSelect={(newValue) => handleValueChange(startIndex + index, column.field, newValue)} />
                                                    ) : (<StatusBadge value={item[column.field]} mapping={column.colorMapping} />)}

                                                </div>

                                            ) : (column.type === ColumnType.CHECK ? (

                                                <div className='justify-center flex'>

                                                    <CheckSlider initialValue={item[column.field] == 'Active' ? true : false} onValueChange={(value) =>
                                                        onStatusChange ? onStatusChange(item.id, value) : undefined
                                                    } />


                                                </div>
                                            ) : (
                                                <div className='justify-start flex'>
                                                    {column.isEditable ?
                                                        (
                                                            <EditableInfo
                                                                validations={column.validations}
                                                                editable={column.isEditable && expandedRows == index}
                                                                initialValue={item[column.field]}
                                                                onValueChange={(newValue) => handleValueChange(startIndex + index, column.field, newValue)}
                                                            />
                                                        ) : (<p>{item[column.field]}</p>)
                                                    }


                                                </div>)




                                            ))}
                                    </td>
                                ))}
                                <td key={`${index}-collapsedrow-button`} className="border-b border-gray-200" onClick={() => toggleRowExpansion(index)}>
                                    <div className='hover:bg-cyan-100 w-fit w-16 '>
                                        {expandedRows == index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        )}
                                    </div>

                                </td>
                            </tr>

                            {expandedRows == index && (
                                <tr key={`${index}-expanded`}>
                                    <td key={`${index}-expanded-td`} colSpan={columnData.length + 1} className="px-4 py-4 bg-gray-50 text-left border border-t border-gray-200">
                                        <div className="grid grid-cols-1 gap-2">
                                            {columnData.map((col) => (
                                                col.isHidden &&
                                                <div className="flex justify-between px-16">
                                                    <span className="font-semibold tex">{col.header}:</span>
                                                    <span><EditableInfo editable={col.isEditable} validations={col.validations} onValueChange={(newValue) => handleValueChange(startIndex + index, col.field, newValue)} initialValue={item[col.field]} /></span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='my-4 w-full flex justify-end' >
                                            <RoundedButton onClick={handleSave} label='Save' width='70px' color='hover:bg-cyan-400' />
                                        </div>

                                    </td>

                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>


            <div className="flex justify-between my-4">
                <div className="flex items-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={`${index + 1}-collapse-paginate`}
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

export default CollapsedRowTable;
