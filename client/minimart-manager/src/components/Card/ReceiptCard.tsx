import { Receipt } from "../../data/Entities/Receipt";
import minimartlogo from "../../assets/images/minimart.jpg";
import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";
interface ReceiptCardProp {
  receipt: Receipt;
  onClick: () => void;
}
const ReceiptCard: React.FC<ReceiptCardProp> = ({ receipt, onClick }) => {
  const barcodeRef = useRef(null);
  function formatDate(date: Date) {
    console.log(date);
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
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
    <div
      onClick={onClick}
      className="receipt=card cursor-pointer border rounded-[5px] p-4 shadow-lg bg-[#faffb6] flex flex-col gap-4 w-full max-w-md"
    >
      {/*Header*/}
      <div className="flex justify-between items-center">
        <img
          src={minimartlogo}
          className="w-16 h-16 rounded-full object-cover"
        ></img>
        <h2 className="text-lg font-bold text-gray-800">
          #{receipt.receiptNumber}
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

      {/*Details*/}
      <div className="text-gray-600 justify-between flex p-4 ">
        {/* <p>
          <span className="font-semibold">Date:</span>{" "}
          {formatDate(new Date(receipt.time))}
        </p>
        <p>
          <span className="font-semibold">Payment Method:</span>{" "}
          {receipt.paymentMethod}
        </p>
        <p>
          <span className="font-semibold">Total Items:</span>{" "}
          {receipt.details.reduce((total, item) => total + item.quantity, 0)}
        </p>
        <p>
          <span className="font-semibold">Total Price:</span> $
          {receipt.details
            .reduce((total, item) => total + item.netPrice * item.quantity, 0)
            .toFixed(2)}
        </p> */}
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
            {receipt.details.reduce((total, item) => total + item.quantity, 0)}
          </p>
          <p>
            $
            {receipt.details
              .reduce((total, item) => total + item.netPrice * item.quantity, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
      {/* Barcode */}
      <div className="barcode-container flex justify-center">
        <svg ref={barcodeRef}></svg>
      </div>
    </div>
  );
};
export default ReceiptCard;
