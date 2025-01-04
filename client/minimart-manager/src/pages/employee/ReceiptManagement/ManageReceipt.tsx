import { useEffect, useState } from "react";
import { getAllReceipts } from "../../../services/api/ReceiptApi";
import { Receipt } from "../../../data/Entities/Receipt";
import ReceiptModal from "../../../components/Modal/ReceiptModal";
import RoundedButton from "../../../components/Button/RoundedButton";
import { useNavigate } from "react-router-dom";
import TableLayout from "../../../components/Table/TableLayout";
import Urls from "../../../constant/urls";
import { receiptColumnData } from "../../../data/ColumnData/ReceiptColumnData";

const ManageReceipt = () => {
  const [rcData, setRcData] = useState<Receipt[]>([]);
  const navigate = useNavigate();
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
    <div className="flex flex-col manage-receipt-container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Receipts</h1>
      <div className="grow">
        <TableLayout
          action={(id: string) => setSelectedReceipt(rcData.find((r) => r._id === id) || null)}
          addItem={() => { navigate(Urls.ADMIN.RECEIPT.ADD.Path) }}
          title="Receipt Control"
          data={rcData}
          columns={receiptColumnData} />
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
