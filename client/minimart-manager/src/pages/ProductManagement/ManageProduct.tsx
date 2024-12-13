import { useEffect, useState } from "react";
import RoundedButton from "../../components/Button/RoundedButton";
import { getAllProducts } from "../../services/api/ProductApi";
import OverviewTable from "../../components/Table/OverviewTable";
interface Product {
  _id: String;
  name: String;
  price: Number;
  stock: Number;
  status: String;
}

const ManageProduct = () => {
  const [data, setData] = useState<Product[]>([]);
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
  useEffect(() => {
    fetchProducts();
  }, []);
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
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-center">Price</th>
              <th className="py-3 px-6 text-center">Stock</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">1</td>
              <td className="py-3 px-6 text-left">Product Name</td>
              <td className="py-3 px-6 text-center">$50</td>
              <td className="py-3 px-6 text-center">In Stock</td>
              <td className="py-3 px-6 text-center">
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table> */}
        <OverviewTable
          title="Products Overview"
          itemData={data}
          columnHeaders={columnHeaders}
          dataFields={dataFields}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <RoundedButton label="Previous" color="text-white bg-cyan-500" />
        </div>
        <div>
          <RoundedButton label="Next" color="text-white bg-cyan-500" />
        </div>
      </div>
    </div>
  );
};
export default ManageProduct;
