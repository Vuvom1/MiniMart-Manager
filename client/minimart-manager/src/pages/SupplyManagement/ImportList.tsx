import { useEffect, useState } from "react";
import RoundedButton from "../../components/Button/RoundedButton";
import TextField from "../../components/InputField/TextField";
import { useNavigate } from "react-router-dom";
import { getAllImports } from "../../services/api/ImportApi";
import useSearch from "../../utils/SearchUtil";


interface Import {
    _id: string;
    supplier: { name: string };
    date: string;
    totalQuantity: number;
    totalImportPrice: number;
}

function ImportList() {
    const navigate = useNavigate();
    const [imports, setImports] = useState<Import[]>([]);

    const columnHeaders = [
        "Id",
        "Supplier",
        "Date",
        "Total Quantity",
        "Total Import Price",
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(13);

    const totalPages = Math.ceil(imports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = imports.slice(startIndex, endIndex);

    const { searchTerm, handleSearchChange, filteredData } = useSearch(imports);

    const fetchImports = async () => {
        try {
            const data = await getAllImports();

            setImports(data)
            console.log(data)
        } catch (error) {
            console.error('Error fetching imports:', error);
        } finally {
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

                <div className="overflow-auto flex-auto max-h-[calc(100vh-350px)] rounded-lg shadow-md" >

                    <table className="min-w-full bg-white text-center rounded-lg shadow-md">
                        <thead className="bg-gray-100 sticky top-0 border ">

                            <tr>
                                {columnHeaders.map((header, index) => (
                                    <th
                                        key={index}
                                        className="sticky px-4 py-2 text-gray-500 font-semibold"
                                    >
                                        {header}
                                    </th>
                                ))}

                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-300">
                            {filteredData.map((item, index) => (
                                <tr key={index} className="border-t border-gray-200">
                                    <td className="px-4 py-4">{item._id.slice(0, 8) + "..."}</td>
                                    <td className="px-4 py-4">{item.supplier.name}</td>
                                    <td className="px-4 py-4">{new Date(item.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-4">{item.totalQuantity}</td>
                                    <td className="px-4 py-4">${item.totalImportPrice}</td>
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

    );
}

export default ImportList;
