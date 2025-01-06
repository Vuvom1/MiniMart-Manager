import React, { ChangeEvent, useEffect, useState } from "react";
import { addOneProduct } from "../../../services/api/ProductApi";
import { getAllSubcategories } from "../../../services/api/SubCategoryApi";
import TextField from "../../../components/InputField/TextField";
import ValidationUtil from "../../../utils/ValidationUtil";
import { useNavigate } from "react-router-dom";
import { ProductStatus } from "../../../constant/enum";
interface SubCategory {
  _id: string;
  name: string;
  shelfId: string;
  category: string;
}
const AddProduct: React.FC = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subCate, setSubcate] = useState<SubCategory[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [isBarcodeValid, setIsBarcodeValid] = useState(false);
  const [isDetailsValid, setIsDetailsValid] = useState(false);
  const [errors, setErrors] = useState<{
    name: string | null;
    barcode: string | null;
    detail: string | null;
    image: string | null;
    subCategory: string | null;
  }>({
    name: null,
    barcode: null,
    detail: null,
    image: null,
    subCategory: null,
  });
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    barcode: "",
    detail: "",
    image: "",
    stock: 0,
    dateOfManufacture: "",
    expiryDate: "",
    status: ProductStatus.IN_STOCK,
    subCategory: "",
  });
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
    getSubCategories();
  }, []);
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
  const handleValidationChange = (isValid: boolean) => {
    setIsValid(isValid);
  };
  const handleBarcodeValidationChange = (isValid: boolean) => {
    setIsBarcodeValid(isValid);
  };
  const handleDetailsValidationChange = (isValid: boolean) => {
    setIsDetailsValid(isValid);
  };
  const handleSubmit = async () => {
    // setErrors({
    //   name: null,
    //   barcode: null,
    //   detail: null,
    //   image: null,
    //   subCategory: null,
    // });
    // const nameError = ValidationUtil.validateRequired(formData.name, "name");
    // const detailError = ValidationUtil.validateRequired(
    //   formData.detail,
    //   "details"
    // );
    // const barcodeError = ValidationUtil.validateBarcode(formData.barcode);
    // const imageError = ValidationUtil.validateRequired(formData.image, "image");
    // const subCategoryError = ValidationUtil.validateRequired(
    //   formData.subCategory,
    //   "subcategory"
    // );
    // if (
    //   nameError ||
    //   detailError ||
    //   barcodeError ||
    //   imageError ||
    //   subCategoryError
    // ) {
    //   setErrors({
    //     name: nameError,
    //     barcode: barcodeError,
    //     detail: detailError,
    //     image: imageError,
    //     subCategory: subCategoryError,
    //   });
    //   return;
    // }
    if (!(isValid && isBarcodeValid && isDetailsValid)) {
      console.log(isValid, isBarcodeValid, isDetailsValid);
      return;
    }
    try {
      setIsLoading(true);
      const response = await addOneProduct(formData);
      console.log(formData.status);
      alert(response.message);
      nav(-1);
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
              value={formData.name}
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
            value={formData.name}
            onChange={handleChange}
            validations={[ValidationUtil.validateRequired("Name")]}
            validationPassed={handleValidationChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (VND)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
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
              value={formData.subCategory}
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
            {errors.subCategory != null && (
              <p className="text-xs text-red-500">{errors.subCategory}</p>
            )}{" "}
            {/* Changed to use Tailwind class for color */}
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Barcode
            </label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
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
            value={formData.barcode}
            onChange={handleChange}
            validations={[
              ValidationUtil.validateBarcode,
              ValidationUtil.validateRequired("barcode"),
            ]}
            validationPassed={handleBarcodeValidationChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            {/* <label className="block text-sm font-medium text-gray-700">
              Detail
            </label>
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.detail != null && (
              <p className="text-xs text-red-500">{errors.detail}</p>
            )}{" "} */}
            <TextField
              id="product_detail_txt"
              label="Detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              placeholder="Write details here"
              rows={3}
              validations={[ValidationUtil.validateRequired("Detail")]}
              validationPassed={handleDetailsValidationChange}
              multiline={true}
            />
            {/* Changed to use Tailwind class for color */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Manufacture
            </label>
            <input
              type="date"
              name="dateOfManufacture"
              value={formData.dateOfManufacture}
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
              value={formData.expiryDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div> */}
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
            {formData.image && (
              <img
                src={formData.image as string}
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
                onClick={() => setFormData({ ...formData, image: "" })}
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
export default AddProduct;
