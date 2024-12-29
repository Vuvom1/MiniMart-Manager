import { useEffect, useRef } from "react";
import { Receipt } from "../../data/Entities/Receipt";
import JsBarcode from "jsbarcode";
import minimartlogo from "../../assets/images/minimart.jpg";
import { useReactToPrint } from "react-to-print";
import RoundedButton from "../Button/RoundedButton";

interface ReceiptModalProp {
  receipt: Receipt | null;
  onClose: () => void;
}
const ReceiptModal: React.FC<ReceiptModalProp> = ({ receipt, onClose }) => {
  if (!receipt)
    return (
      <div className="justify-center text-center m-auto">
        Sorry, no receipt here
      </div>
    );
  const receiptRef = useRef<HTMLDivElement>(null);

  const barcodeRef = useRef(null);
  function formatDate(date: Date) {
    console.log(date);
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const handlePrint = useReactToPrint({ contentRef: receiptRef });
  useEffect(() => {
    if (receipt.receiptNumber) {
      JsBarcode(barcodeRef.current, receipt.receiptNumber, {
        format: "CODE128",
        width: 2,
        height: 50,
        displayValue: true,
        background: "#faffb6",
      });
    }
  }, [receipt.receiptNumber]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          &#x2715;
        </button>
        <div ref={receiptRef} className="printable">
          {/* Receipt Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Receipt #{receipt.receiptNumber}
            </h2>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded ${
                receipt.transactionType === "Delivery"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {receipt.transactionType}
            </span>
          </div>

          {/* Receipt Details */}
          <div className="text-gray-600 space-y-2 justify-between flex p-4">
            <div className="field font-bold flex flex-col gap-2 text-left">
              <p>Date:</p>
              <p>Payment method:</p>
              <p>Total Items:</p>
              <p>Total Price:</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p>{formatDate(new Date(receipt.time))}</p>
              <p>{receipt.paymentMethod}</p>
              <p>
                {receipt.details.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </p>
              <p>
                $
                {receipt.details
                  .reduce(
                    (total, item) => total + item.netPrice * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
          </div>

          {/* Receipt Items */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Items:</h3>
            <ul className="space-y-1">
              {receipt.details.map((item, index) => (
                <li key={index} className="text-gray-600">
                  {item.quantity}x Product {item.product.name} - $
                  {item.netPrice * item.quantity}
                </li>
              ))}
            </ul>
          </div>

          {/* Barcode */}
          <div className="mt-6 flex justify-center">
            <svg ref={barcodeRef}></svg>
          </div>
        </div>
        {/* Print */}
        <RoundedButton
          label="Print"
          onClick={handlePrint}
          color="#faffb6"
          rounded="rounded-[6px]"
        />
      </div>
    </div>
  );
};
export default ReceiptModal;
