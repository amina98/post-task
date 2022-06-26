import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userData = action.payload;
    },
    logOutUser(state) {
      state.userData = {};
    },
  },
});
export const selectUser = (state) => state.user;
export const { loginUser: loginUserAction, logOutUser: logOutUserAction } =
  userSlice.actions;
export default userSlice.reducer;
