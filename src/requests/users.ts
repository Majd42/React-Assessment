import axios from "axios";
import { getUsersProps } from "../types";

export const getUsersRequest = async ({
  limit,
  selectQuery,
  queryName,
  skip,
}: getUsersProps) => {
  try {
    const response = await axios.get(
      `https://dummyjson.com/users${selectQuery ? "/filter" : ""}?${
        selectQuery ? "key=" + queryName + "&value=" + selectQuery : ""
      }&limit=${limit}&skip=${skip}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
