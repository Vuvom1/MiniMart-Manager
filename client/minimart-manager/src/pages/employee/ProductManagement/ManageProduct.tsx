import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/api/ProductApi";
import { useNavigate } from "react-router-dom";
import TableLayout from "../../../components/Table/TableLayout";
import { ProductColumnData } from "../../../data/ColumnData/ProducColumnData";
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
  useEffect(() => {
    fetchProducts();
  }, []);
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
                  <button className="text-red-600 hover:text-red-800">
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
    </div>
  );
};
export default ManageProduct;
