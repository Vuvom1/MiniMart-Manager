import { useEffect, useState } from "react";
import RoundedButton from "../../components/Button/RoundedButton";
import TextField from "../../components/InputField/TextField";
import { useNavigate } from "react-router-dom";
import { getAllImports } from "../../services/api/ImportApi";
import useSearch from "../../utils/SearchUtil";
import { importsColumnData } from "../../data/ColumnData/ImportColumnData";
import { StatusBadge } from "../../components/Badge/StatusBadge";
import NestedValueUtil from "../../utils/NestedValueUtil";
import { Import } from "../../data/Entities/Import";
import { TimeUtil } from "../../utils/TimeUtil";
import { ColumnType } from "../../constant/enum";
import { importStatusColorMapping } from "../../constant/mapping";


function ImportList() {
    const navigate = useNavigate();
    const [imports, setImports] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(13);

    const totalPages = Math.ceil(imports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const timeUtil = new TimeUtil();

    const { searchTerm, handleSearchChange, filteredData } = useSearch(imports);

    const fetchImports = async () => {
        try {
            const data = await getAllImports();

            setImports(data)
        } catch (error) {
            console.error('Error fetching imports:', error);
        } finally {
            console.log(imports)
        }
    };

    useEffect(() => {
        fetchImports();
    }, []);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    function navigateAddImport() {
        navigate('/supplies/imports/add')
    }

    const handleItemDetailClick = (item: Import) => {
        navigate(`${item.id}`)
    };

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-x-4 items-center justify-between">
                <h1 className="text-2xl font-bold flex-auto text-gray-800 mb-8">
                    Import List
                </h1>
                <div>
                    <RoundedButton
                        onClick={navigateAddImport}
                        color="bg-cyan-500 text-white"
                        label="Add Import"
                        prefixIcon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        }
                    />
                </div>
            </div>

            <div className="flex gap-4 max-h-full">
                <div className="flex flex-col bg-white shadow-md rounded-lg p-4 grow gap-y-4">

                    <div className="flex gap-x-4 justify-between">
                        <div className="w-64">
                            <TextField
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                placeholder="Search here..."
                                prefix={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                }
                            />
                        </div>
                        <div>
                            <RoundedButton label="Filter" />
                        </div>
                    </div>

                    <div className="overflow-auto flex-auto h-[calc(100vh-350px)] rounded-lg " >

                        <table className="min-w-full bg-white text-center rounded-lg shadow-md">
                            <thead className="bg-gray-100 sticky top-0 border ">

                                <tr>
                                    {importsColumnData.map((column, index) => (
                                        column.isCollapsed == true &&
                                        <th
                                            key={index}
                                            className={`sticky ${column.type == ColumnType.ID ? 'pl-8' : ''} px-4  py-2 text-gray-400 font-semibold ${column.type == ColumnType.STATUS ? 'text-center' : 'text-left'} `}
                                        >
                                            {column.header}
                                        </th>

                                    ))}
                                    <th className="sticky px-4 py-2 text-gray-400 font-semibold">Detail</th>

                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-300">
                                {filteredData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`border-t border-gray-200 cursor-pointer hover:bg-gray-50`}

                                    >
                                        {importsColumnData.map((column, columnIndex) => (
                                            column.isCollapsed &&
                                            <td key={columnIndex} className="px-4 py-4 border-b border-gray-200">
                                                {column.type === ColumnType.ID ? (
                                                    <div className='justify-start gap-x-2 flex'>
                                                        <button
                                                            className="ml-2 p-1 border w-6 h-6 rounded hover:bg-gray-300"
                                                            onClick={() => handleCopyId(item[column.field])}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                                            </svg>

                                                        </button>
                                                        {item[column.field].slice(0, 8) + '...'}

                                                    </div>
                                                ) :
                                                    (column.type === ColumnType.STATUS ? (

                                                        <div className='justify-center flex'>
                                                            <StatusBadge value={item[column.field]} mapping={importStatusColorMapping} />
                                                        </div>
                                                    ) : (column.type === ColumnType.DATE ? (
                                                        
                                                            <p className="text-gray-700 text-left">{timeUtil.formatDateToDayMonthYear(item[column.field])}</p>
                                                       
                                                    ) : (
                                                        
                                                            <p className="text-gray-700 text-start"> {NestedValueUtil.getNestedValue(item, column.field) ?? 'N/A'}</p>
                                                        
                                                    )))}
                                            </td>
                                        ))}
                                        <td>
                                            <button
                                                className="hover:bg-cyan-200 rounded-lg"
                                                onClick={() => handleItemDetailClick(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                </svg>

                                            </button>

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
                                    key={index + 1}
                                    className={`px-3 mx-1 py-1 rounded ${currentPage === index + 1
                                        ? "bg-cyan-500 text-white"
                                        : "bg-white border border-black"
                                        }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
}

export default ImportList;
