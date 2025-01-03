import React, { useEffect, useState } from "react";
import {
  PaymentMethod,
  ReceiptStatus,
  TransactionType,
} from "../../../constant/enum";
import { Receipt } from "../../../data/Entities/Receipt";
import { Product } from "../../../data/Entities/Product"; // Replace with actual Product fetching logic
import { getAllProducts } from "../../../services/api/ProductApi";

const AddReceipt: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error: any) {
        alert("Can't fetch products from the system");
      }
    };
    fetchProducts();
  }, []);
  const [receipt, setReceipt] = useState<Receipt>({
    receiptNumber: "",
    paymentMethod: PaymentMethod.CASH,
    time: new Date(),
    transactionType: TransactionType.IN_STORE,
    details: [],
    status: ReceiptStatus.PENDING,
  });

  const handleAddProduct = () => {
    setReceipt((prevReceipt: Receipt) => ({
      ...prevReceipt,
      details: [
        ...prevReceipt.details,
        { product: {} as Product, quantity: 1, netPrice: 0 },
      ],
    }));
  };

  const handleProductChange = (
    index: number,
    key: keyof Product,
    value: any
  ) => {
    const updatedDetails = receipt.details.map((detail, idx) =>
      idx === index
        ? { ...detail, product: { ...detail.product, [key]: value } }
        : detail
    );
    setReceipt({ ...receipt, details: updatedDetails });
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedDetails = receipt.details.map((detail, idx) =>
      idx === index ? { ...detail, quantity } : detail
    );
    setReceipt({ ...receipt, details: updatedDetails });
  };

  const handleNetPriceChange = (index: number, netPrice: number) => {
    const updatedDetails = receipt.details.map((detail, idx) =>
      idx === index ? { ...detail, netPrice } : detail
    );
    setReceipt({ ...receipt, details: updatedDetails });
  };

  const handleSubmit = () => {
    // Handle submission logic here (e.g., API call)
    console.log(receipt);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add New Receipt</h1>

      {/* Receipt Basic Info */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Receipt Number</label>
        <input
          type="text"
          value={receipt.receiptNumber}
          onChange={(e) =>
            setReceipt({ ...receipt, receiptNumber: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Payment Method</label>
        <select
          value={receipt.paymentMethod}
          onChange={(e) =>
            setReceipt({
              ...receipt,
              paymentMethod: e.target.value as PaymentMethod,
            })
          }
          className="w-full p-2 border rounded"
        >
          <option value={PaymentMethod.CASH}>Cash</option>
          <option value={PaymentMethod.ONLINE}>Online</option>
        </select>
      </div>

      {/* Transaction Type */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Transaction Type</label>
        <select
          value={receipt.transactionType}
          onChange={(e) =>
            setReceipt({
              ...receipt,
              transactionType: e.target.value as TransactionType,
            })
          }
          className="w-full p-2 border rounded"
        >
          <option value={TransactionType.IN_STORE}>In Store</option>
          <option value={TransactionType.DELIVERY}>Delivery</option>
        </select>
      </div>

      {/* Products */}
      <h2 className="text-lg font-semibold mb-4">Products</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Net Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {receipt.details.map((detail, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  list="productOptions"
                  type="text"
                  placeholder="Product Name"
                  value={detail.product?.name || ""}
                  onChange={(e) =>
                    handleProductChange(index, "name", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                <datalist id="productOptions">
                  {products.map((v, i) => (
                    <option id={v?._id}>{v.name}</option>
                  ))}
                </datalist>
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={detail.quantity}
                  onChange={(e) => handleQuantityChange(index, +e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={detail.netPrice}
                  onChange={(e) => handleNetPriceChange(index, +e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() =>
                    setReceipt((prevReceipt) => ({
                      ...prevReceipt,
                      details: prevReceipt.details.filter(
                        (_, idx) => idx !== index
                      ),
                    }))
                  }
                  className="text-red-500"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddProduct}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-6"
      >
        Add Product
      </button>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Receipt
      </button>
    </div>
  );
};

export default AddReceipt;
