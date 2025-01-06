import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import TableLayout from "../../../components/Table/TableLayout";
import { ProductColumnData } from "../../../data/ColumnData/ProducColumnData";

import RoundedButton from "../../../components/Button/RoundedButton";
import {
  deleteProduct,
  getAllProducts,
} from "../../../services/api/ProductApi";
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
        image: p.image,
        name: p.name,
        category: p.subCategory.name,
        price: p.price,
        stock: p.stock,
        status: p.status,
      }));
      setData(extractedProducts);
      console.log(fetchedProducts)
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

  }, []);

  const columnHeaders = ["ID", "Name", "Price", "Stock", "Status"];
  const dataFields = ["_id", "name", "price", "stock", "status"];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <div >
        <TableLayout
          action={(id: string) => { nav(`${id}`) }}
          addItem={() => { nav("add") }}
          title={"Product list"}
          data={data}
          columns={ProductColumnData}
        />
      </div>

      {/* <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
      </div> */}

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
