import axios from "axios";
import { getServiceURL } from "./utils";
import { getAuthToken } from "./_hooks";

export const fetchStoreInfo = async (storeName) => {
  try {
    const response = await axios.get(`${getServiceURL()}/store/${storeName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching store info:", error);
    throw error;
  }
};

export const fetchProducts = async ({
  storeName,
  limit = 10,
  page = 1,
  category = "",
  searchText = "",
  sort = -1,
}) => {
  const response = await axios.get(
    `${getServiceURL()}/product/all/${storeName}/?limit=${limit}&page=${page}&category=${category}&searchText=${searchText}&sort=${sort}`
  );

  return response.data;
};

export const fetchListOfVouchers = async ({
  storeName,
  limit = 10,
  page = 1,
  searchText = "",
  sort = -1,
  offerType = [],
}) => {
  const response = await axios.get(
    `${getServiceURL()}/voucher/all/${storeName}/?limit=${limit}&page=${page}&searchText=${searchText}&sort=${sort}&offerType=${offerType}`
  );

  return response.data;
};

export const fetchCategoryList = async () => {
  try {
    const response = await axios.get(`${getServiceURL()}/category`);
    return response.data; // Assuming the response returns categories directly
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Throwing error to handle it in the provider
  }
};

export const getStripePublishableKey = async () => {
  try {
    const response = await axios.get(
      `${getServiceURL()}/configuration/stripe`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDI2NDI2ODE0MDc3Mjc4MzcwMzQiLCJpYXQiOjE3MzY4NzgzNDV9.AY3hPGMEY5qr5GwAujJ8jwT8_yxGf750HebMgijdWVo"}`,
          //Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data; // Assuming the response returns categories directly
  } catch (error) {
    console.error("Error fetching publishable key:", error);
    throw error; // Throwing error to handle it in the provider
  }
};

export const fetchPlacedOrders = async (storeName) => {
  const response = await axios.get(
    `${getServiceURL()}/order/userCart/${storeName}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  return response.data;
};

export const fetchBanners = async (storeName) => {
  const response = await fetch(
    `${getServiceURL()}/store/fetchStoreByBusinessName`,
    {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${getAuthToken()}`,
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDI2NDI2ODE0MDc3Mjc4MzcwMzQiLCJpYXQiOjE3MzY4NzgzNDV9.AY3hPGMEY5qr5GwAujJ8jwT8_yxGf750HebMgijdWVo"}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        businessName: storeName,
      }),
    }
  );
  return response.data;
};

export const createOrder = async (addressInfo, totalOrderCost, products) => {
  const URL = getServiceURL();
  const authToken = getAuthToken(); // Replace this with your actual token retrieval logic
  try {
    const response = await axios.post(
      `${URL}/order/create`,
      {
        products,
        storeId: "6788d36562216381aef8b233",
        addressInfo,
        totalOrderCost,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDI2NDI2ODE0MDc3Mjc4MzcwMzQiLCJpYXQiOjE3MzY4NzgzNDV9.AY3hPGMEY5qr5GwAujJ8jwT8_yxGf750HebMgijdWVo"}`,
          //Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for the caller to handle
  }
};
