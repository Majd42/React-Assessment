import axios from "axios";
import { GetProductsProps } from "../types";

export const getProductsRequest = async ({
  limit,
  skip,
  selectQuery,
}: GetProductsProps) => {
  try {
    const response = await axios.get(
      `https://dummyjson.com/products${selectQuery ? "/search" : ""}?${
        selectQuery ? "q=" + selectQuery : ""
      }&limit=${limit}&skip=${skip}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
