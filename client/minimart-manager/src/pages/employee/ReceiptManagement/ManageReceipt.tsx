import { useEffect, useState } from "react";
import { getAllReceipts } from "../../../services/api/ReceiptApi";
import { Receipt } from "../../../data/Entities/Receipt";
import ReceiptCard from "../../../components/Card/ReceiptCard";
import ReceiptModal from "../../../components/Modal/ReceiptModal";

const ManageReceipt = () => {
  const [rcData, setRcData] = useState<Receipt[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rcData.map((receipt) => (
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
