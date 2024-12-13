import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getProductById,
  updateProduct,
} from "../../../services/api/ProductApi";
import { getAllSubcategories } from "../../../services/api/SubCategoryApi";
import { Product } from "../../../data/Entities/Product";
import { useNavigate, useParams } from "react-router-dom";
import ValidationUtil from "../../../utils/ValidationUtil";
import TextField from "../../../components/InputField/TextField";
interface SubCategory {
  _id: string;
  name: string;
  shelfId: string;
  category: string;
}
type RouteParams = {
  id: string;
};
const EditProduct: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subCate, setSubcate] = useState<SubCategory[]>([]);
  const [errors, setErrors] = useState<{
    name: string | null;
    barcode: string | null;
    detail: string | null;
    image: string | null;
  }>({
    name: null,
    barcode: null,
    detail: null,
    image: null,
  });
  const subCategory2: SubCategory = {
    _id: "",
    name: "",
    shelfId: "",
    category: "",
  };
  const [formData, setFormData] = useState<Product>();
  const [originalData, setOriginalData] = useState<Product>();
  const { id } = useParams<RouteParams>();
  const nav = useNavigate();
  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const fetched = await getAllSubcategories();
        setSubcate(fetched);
      } catch (error: any) {
        console.error(error);
        alert("No, we can't");
      }
    };
    const getProduct = async (id: string) => {
      if (!id) {
        console.error("No ID provided");
        return;
      }
      try {
        const idProduct = await getProductById(id);
        console.log(idProduct.dateOfManufacture);
        setFormData({
          ...idProduct,
          dateOfManufacture: formatDateForInput(idProduct.dateOfManufacture),
          expiryDate: formatDateForInput(idProduct.expiryDate),
        });
        setOriginalData({
          ...idProduct,
          dateOfManufacture: formatDateForInput(idProduct.dateOfManufacture),
          expiryDate: formatDateForInput(idProduct.expiryDate),
        });
        console.log("Name: ");
      } catch (error: any) {
        console.error(error);
        alert("No, we can't");
      }
    };
    getSubCategories();
    getProduct(id || "");
  }, []);
  function formatDateForInput(dateString: string): string {
    // Create a Date object from the string
    const date = new Date(dateString);

    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFormData({ ...formData, image: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    setErrors({
      name: null,
      barcode: null,
      detail: null,
      image: null,
    });
    const nameError = ValidationUtil.validateRequired(
      formData?.name ?? "",
      "name"
    );
    const detailError = ValidationUtil.validateRequired(
      formData?.detail ?? "",
      "details"
    );
    const barcodeError = ValidationUtil.validateBarcode(
      formData?.barcode ?? ""
    );
    const imageError = ValidationUtil.validateRequired(
      formData?.image ?? "",
      "image"
    );

    if (nameError || detailError || barcodeError || imageError) {
      setErrors({
        name: nameError,
        barcode: barcodeError,
        detail: detailError,
        image: imageError,
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await updateProduct(formData);
      alert(response.message);
      nav("/products");
    } catch (error: any) {
      console.error("Error adding product: ", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(
          error.response.data.message ||
            "Failed to add product. Please check your input."
        );
      } else if (error.request) {
        // Request was made but no response was received
        alert("Unable to connect to the server. Please try again later.");
      } else {
        // Something else caused the error
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Add New Product here!
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}
          <TextField
            placeholder="Type your name here"
            label="Name"
            id="nameInput"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            error={errors.name}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (VND)
            </label>
            <input
              type="number"
              name="price"
              value={formData?.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sub-category
            </label>
            <select
              name="subCategory"
              value={formData?.subCategory?._id}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a subcategory</option>
              {subCate.map((v, i) => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Barcode
            </label>
            <input
              type="text"
              name="barcode"
              value={formData?.barcode}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}
          <TextField
            placeholder="Type your name here"
            label="Barcode"
            id="barcodeInput"
            name="barcode"
            value={formData?.barcode}
            onChange={handleChange}
            error={errors.barcode}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData?.stock}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Detail
            </label>
            <textarea
              name="detail"
              value={formData?.detail}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.detail != null && (
              <p className="text-xs text-red-500">{errors.detail}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Manufacture
            </label>
            <input
              type="date"
              name="dateOfManufacture"
              value={formData?.dateOfManufacture}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData?.expiryDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData?.status}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-500"
            />
            {formData?.image && (
              <img
                src={formData?.image as string}
                alt="Product Preview"
                className="mt-3 max-h-32 object-cover rounded-md shadow-md"
              />
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {!isLoading ? (
            <>
              <button
                type="button"
                onClick={() => setFormData(originalData)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-500">Submitting...</span>
            </div>
          )}
        </div>{" "}
      </form>
    </div>
  );
};
export default EditProduct;
