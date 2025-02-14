import { createSlice } from "@reduxjs/toolkit";

interface initialStateProp {
  isLogin: Boolean;
  userName: String;
}
const initialState: initialStateProp = {
  isLogin: false,
  userName: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    isLogin: (state) => {
      state.isLogin = true;
    },
  },
});
export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
