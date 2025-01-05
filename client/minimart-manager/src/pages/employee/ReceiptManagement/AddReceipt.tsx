import React, { useEffect, useState } from "react";
import {
  PaymentMethod,
  ReceiptStatus,
  TransactionType,
} from "../../../constant/enum";
import { Receipt } from "../../../data/Entities/Receipt";
import { Product } from "../../../data/Entities/Product"; // Replace with actual Product fetching logic
import { getAllProducts } from "../../../services/api/ProductApi";
import { createReceipts } from "../../../services/api/ReceiptApi";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../../components/Button/RoundedButton";
import DraggableFloatComponent from "../../../components/Dragable/DragableComponent";
import ProductScannerComponent from "../../../components/Scanner/ProductScanner";

const AddReceipt: React.FC = () => {
  const [errors, setErrors] = useState<{ productName: string | null }>({
    productName: null,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [isScannerOpened, setIsScannerOpened] = useState<boolean>(false);
  const nav = useNavigate();
  const generateRandomReceiptNumber = () => {
    const prefix = "REC";
    const timestamp = Date.now().toString(36);
    const randomString = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    return `${prefix}-${timestamp}-${randomString}`;
  };
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
    receiptNumber: generateRandomReceiptNumber(),
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
        {
          product: products[0],
          quantity: 1,
          netPrice: (products[0].price || 0) * 1,
        },
      ],
    }));
  };

  const handleProductChange = (index: number, productId: string) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    const updatedDetails = receipt.details.map((detail, idx) =>
      idx === index
        ? {
          ...detail,
          product: selectedProduct || ({} as Product),
          netPrice: (selectedProduct?.price || 0) * detail.quantity,
        }
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

  // const handleNetPriceChange = (index: number, netPrice: number) => {
  //   const updatedDetails = receipt.details.map((detail, idx) =>
  //     idx === index ? { ...detail, netPrice } : detail
  //   );
  //   setReceipt({ ...receipt, details: updatedDetails });
  // };

  const handleSubmit = async () => {
    // Handle submission logic here (e.g., API call)
    try {
      const response = await createReceipts(receipt);
      console.log(response.message);

      return response;
    } catch (error) {
      alert("Can't add receipt");
    } finally {
      nav(-1);
    }
  };

  const handleProductScanned = (product: Product) => {
    setReceipt((prevReceipt) => ({
      ...prevReceipt,
      details: [
        ...prevReceipt.details,
        {
          product: product,
          quantity: 1,
          netPrice: product.price || 0,
        },
      ],
    }));
  }

  return (<>

    <div className="min-h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Add New Receipt</h1>



      {/* Receipt Basic Info */}
      <div className=" mb-6 gap-4 grow flex">
        <div className="flex flex-col bg-white  overflow-y-auto p-6 gap-4 rounded-lg w-2/3">
          <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <RoundedButton label="Scan Product" onClick={() => setIsScannerOpened(!isScannerOpened)} />
          </div>
          
            <div className="overflow-y-auto max-h-96 grow">
            <table className="w-full table-auto border-collapse border border-gray-300">
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
                  <select
                  value={detail.product?._id || ""}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                  >
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                    {product.name}
                    </option>
                  ))}
                  </select>
                  <p className="flex">Barcode: <p className="font-medium ms-2">{detail.product.barcode} </p> </p>
                </td>
                <td className="border p-2">
                  <input
                  type="number"
                  value={detail.quantity}
                  onChange={(e) => handleQuantityChange(index, +e.target.value)}
                  className="w-full p-2 border rounded"
                  />
                </td>
                <td className="p-2 border">{detail.netPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
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
              <tr className="mt-2">
              <RoundedButton label="Add Product" onClick={handleAddProduct} />
              </tr>
              </tbody>
            </table>
            </div>
          

          {/* Submit */}

        </div>
        <div className="flex flex-col bg-white p-6 rounded-lg w-1/3">
          <div className="mb-6">
            <label className="block font-semibold mb-2">Receipt Number</label>
            <input
              type="text"
              value={receipt.receiptNumber}
              readOnly
              className="w-full p-2 border rounded"
            />

          </div>
          {/* Payment Method */}
          <div className="mb-6 grow">
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
          <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-between">
              <p>Total price</p>
              <p>
                {receipt.details
                  .reduce((acc, cur) => acc + cur.netPrice * cur.quantity, 0)
                  .toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              </p>
            </div>

            <div className="flex justify-between item-center">
              <p>Discount</p>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(+e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <p>Final price</p>
              <p className="text-xl font-medium">
                {(
                  receipt.details
                    .reduce((acc, cur) => acc + cur.netPrice * cur.quantity, 0) -
                  discount
                ).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              </p>
            </div>
          </div>
          <RoundedButton label="Submit" onClick={handleSubmit} />
        </div>

      </div>

    </div>
    {
      isScannerOpened && <DraggableFloatComponent
        width="400px"
        height="350px"
        defaultPosition={{ x: 100, y: -500 }}
      >

        <ProductScannerComponent

          onProductScanned={handleProductScanned}
          width={400}
          height={300}
        />


      </DraggableFloatComponent>
    }
  </>
  );
};

export default AddReceipt;
