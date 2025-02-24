import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersProps, UserStateTypes } from "../../types";
import { getUsersRequest } from "../../requests/users";

export const getUsers = createAsyncThunk(
  "/users/getUsers",
  (props: getUsersProps) => getUsersRequest(props)
);

const initialState: UserStateTypes = {
  users: [],
  errorUsers: false,
  loadingUsers: false,
  total: 0,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      (state.loadingUsers = true),
        (state.users = []),
        (state.errorUsers = false);
    }),
      builder.addCase(getUsers.fulfilled, (state, action) => {
        (state.loadingUsers = false),
          (state.users = action.payload.users),
          (state.errorUsers = false),
          (state.total = action.payload.total);
      }),
      builder.addCase(getUsers.rejected, (state) => {
        (state.loadingUsers = false),
          (state.users = []),
          (state.errorUsers = true);
      });
  },
});

export default usersSlice.reducer;
