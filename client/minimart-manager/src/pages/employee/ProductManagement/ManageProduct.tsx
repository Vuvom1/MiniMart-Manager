import { useEffect, useState } from "react";
import RoundedButton from "../../../components/Button/RoundedButton";
import {
  deleteProduct,
  getAllProducts,
} from "../../../services/api/ProductApi";
import OverviewTable from "../../../components/Table/OverviewTable";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../../components/Toast/ErrorToast";
import toast from "react-hot-toast";
import SuccessToast from "../../../components/Toast/SuccessToast";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
interface Product {
  _id: String;
  name: String;
  price: Number;
  stock: Number;
  status: String;
}

const ManageProduct: React.FC = () => {
  const nav = useNavigate();
  const [data, setData] = useState<Product[]>([]);
  const [ndel, setNdel] = useState<Product>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts();
      const extractedProducts: Product[] = fetchedProducts.map((p: any) => ({
        _id: p._id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        status: p.status,
      }));
      setData(extractedProducts);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleDelete = async (id: String) => {
    try {
      const response = await deleteProduct(id);
      fetchProducts();
      toast.custom((t) => (
        <SuccessToast
          message={response.message || "Success!"}
          onDismiss={() => toast.dismiss(t.id)}
        />
      ));
    } catch (error: any) {
      console.log(error);
      toast.custom((t) => (
        <ErrorToast
          message={error || "Something went wrong"}
          onDismiss={() => toast.dismiss(t.id)}
        />
      ));
    } finally {
      setIsConfirmModalOpen(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [data]);
  const columnHeaders = ["ID", "Name", "Price", "Stock", "Status"];
  const dataFields = ["_id", "name", "price", "stock", "status"];
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring focus:border-blue-300"
        />
        <div className="ml-2 px-4 py-2">
          <RoundedButton label="Search" color="text-white bg-cyan-500" />
        </div>
      </div>

      <div className="mb-4">
        <div className="ml-2 px-4 py-2">
          <RoundedButton
            label="Add New Product"
            color="text-white bg-cyan-500"
            onClick={() => {
              nav("add");
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {/* <th className="py-3 px-6 text-left">Product ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-center">Price</th>
              <th className="py-3 px-6 text-center">Stock</th>
              <th className="py-3 px-6 text-center">Actions</th> */}
              {columnHeaders.map((cName) => (
                <th className="py-3 px-6 text-center">{cName}</th>
              ))}
              <th className="py-3 px-6 text-center"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((item) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {item._id}
                </td>
                <td className="py-3 px-6 text-center">{item.name}</td>

                <td className="py-3 px-6 text-center">
                  {item.price.toString()}
                </td>
                <td className="py-3 px-6 text-center">
                  {item.stock.toString()}
                </td>
                <td className="py-3 px-6 text-center">{item.status}</td>

                <td className="py-3 px-6 text-center">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    onClick={() => {
                      nav(`${item._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      setNdel(item);
                      setIsConfirmModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <OverviewTable
          title="Products Overview"
          itemData={data}
          columnHeaders={columnHeaders}
          dataFields={dataFields}
        /> */}
      </div>

      {/* <div className="flex justify-between items-center mt-4">
        <div>
          <RoundedButton label="Previous" color="text-white bg-cyan-500" />
        </div>
        <div>
          <RoundedButton label="Next" color="text-white bg-cyan-500" />
        </div>
      </div> */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
        }}
        onConfirm={() => handleDelete(ndel?._id || "")}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};
export default ManageProduct;
