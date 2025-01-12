import axios from "axios";
import { getServiceURL } from "./utils";
import { getAuthToken } from "./_hooks";

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

// export const getCustomersByUserId = async ({
//   storeName,
//   limit = 10,
//   page = 1,
//   category = "",
//   searchText = "",
//   sort = -1
// }) => {
//   // &category=${category}&searchText=${searchText}&sort=${sort}
//   const response = await axios.get(
//     `${getServiceURL()}/order/getCustomersByUserId/${storeName}/?limit=${limit}&page=${page}&category=${category}&searchText=${searchText}&sort=${sort}`
//   );
//   return response.data;
// };
