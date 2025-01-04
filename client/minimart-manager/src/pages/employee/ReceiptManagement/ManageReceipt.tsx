import { useEffect, useState } from "react";
import { getAllReceipts } from "../../../services/api/ReceiptApi";
import { Receipt } from "../../../data/Entities/Receipt";
import ReceiptCard from "../../../components/Card/ReceiptCard";
import ReceiptModal from "../../../components/Modal/ReceiptModal";
import TextField from "../../../components/InputField/TextField";
import useSearch from "../../../utils/SearchUtil";
import RoundedButton from "../../../components/Button/RoundedButton";
import { useNavigate } from "react-router-dom";

const ManageReceipt = () => {
  const [rcData, setRcData] = useState<Receipt[]>([]);
  const nav = useNavigate();
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const { searchTerm, handleSearchChange, filteredData } = useSearch(
    rcData || []
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllReceipts();
        setRcData(response);
        // console.log(rcData);
      } catch (error) {
        alert(error || "Can't get receipt");
      }
    };
    getData();
  }, []);
  return (
    <div className="manage-receipt-container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Receipts</h1>
      <div className="my-[12px]">
        <RoundedButton
          label="ADD"
          color="bg-[#223456]"
          textColor="text-white"
          onClick={() => {
            nav("add");
          }}
        ></RoundedButton>
      </div>
      <div className="m-auto">
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
        ></TextField>
      </div>
      <div className="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((receipt) => (
          <ReceiptCard
            key={receipt.receiptNumber}
            receipt={receipt}
            onClick={() => setSelectedReceipt(receipt)}
          />
        ))}
      </div>
      {selectedReceipt && (
        <ReceiptModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
};
export default ManageReceipt;
