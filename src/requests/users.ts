import axios from "axios";
import { getUsersProps } from "../types";

export const getUsersRequest = async ({
  limit,
  selectQuery,
  queryName,
  skip,
}: getUsersProps) => {
  console.log(selectQuery);
  console.log(limit, skip);
  console.log(
    `https://dummyjson.com/users${selectQuery ? "/filter" : ""}?${
      selectQuery ? "key=" + queryName + "&value=" + selectQuery : ""
    }&limit=${limit}&skip=${skip}`
  );
  try {
    const response = await axios.get(
      `https://dummyjson.com/users${selectQuery ? "/filter" : ""}?${
        selectQuery ? "key=" + queryName + "&value=" + selectQuery : ""
      }&limit=${limit}&skip=${skip}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
