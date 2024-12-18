import axios from "axios";
import { Product } from "../../data/Entities/Product";

const API_URL = "http://localhost:8000";
const BASE_URL = API_URL + "/api/products";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};
export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};
export const getAllProductByCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getByCategories`);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};
export const addOneProduct = async (data: Object) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    alert("Add product failed");
    throw error.response?.data?.message || "Add product failed";
  }
};
export const updateProduct = async (data?: any) => {
  if (!data) {
    alert("No product to update");
    return;
  }
  try {
    const response = await axios.put(`${BASE_URL}/${data?._id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    alert("Edit product failed");
    throw error.response?.data?.message || "Edit product failed";
  }
};

export const getPopularProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/popular`);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};

export const getTop10DiscountProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top10Discount`);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};

export const getProductsAndPromotionsBySubCategory = async (id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/getBySubCategoryWithPromotions/${id}`
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};

export const getProductDetailsWithPromotion = async (id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${id}/getDetailsWithPromotions`
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};

export const getSimilarProductsWithPromotions = async (id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${id}/getSimilarProductsWithPromotions`
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};
