import axios from "axios";

export const getProductsRequest = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
