import { useState } from "react";
import RoundedButton from "../../components/Button/RoundedButton";
import TextField from "../../components/InputField/TextField";
import CheckBox from "../../components/InputField/CheckBox";

function ImportList() {
    const columnHeaders = [
        "Id",
        "Supplier",
        "Date",
        "Total Products",
        "Total Expenditures",
    ];
    const dataFields = [
        "_id",
        "supplier",
        "date",
        "totalProducts",
        "totalExpenditures",
    ];
    const itemData = [
        { _id: "01", supplier: "Apples", date: "50", totalProducts: "100", totalExpenditures: "50" },
        { _id: "02", supplier: "Bananas", date: "30", totalProducts: "80", totalExpenditures: "60" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" }, { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" }, { _id: "03", supplier: "Oranges", date: "25", totalProducts: "60", totalExpenditures: "40" },
        // Add more data here
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(13);

    const totalPages = Math.ceil(itemData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = itemData.slice(startIndex, endIndex);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-x-4 items-center justify-between">
                <h1 className="text-2xl font-bold flex-auto text-gray-800 mb-8">
                    Import List
                </h1>
                <div>
                    <RoundedButton
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

                <div className="overflow-auto flex-auto max-h-[calc(100vh-350px)]" >

                    <table className="min-w-full bg-white text-center rounded-lg">
                        <thead className="bg-gray-100 sticky top-0 rounded-lg border">

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
                            {currentItems.map((item, index) => (
                                <tr key={index} className="border-t border-gray-200">
                                    
                                    {dataFields.map((field, fieldIndex) => (
                                       
                                           
                                            <td key={fieldIndex} className="px-4 py-4">
                                                {field === "_id" ? (
                                                    <span className="group">
                                                        {item[field].slice(0, 8) + "..."}
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
                            ))}
                        </tbody>

                    </table>

                </div>

                {/* Pagination */}
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
