import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CATEGORY {
  option: string;
  value: string;
}
interface USER {
  firstName: string;
  secondName: string;
  email: string;
  phoneNumber: string;
  categories: CATEGORY[];
}
interface initialStateProp {
  userID: String;
  isLogin: boolean;
  user: USER;
}
const initialState: initialStateProp = {
  userID: "",
  isLogin: false,
  user: {
    firstName: "",
    secondName: "",
    email: "",
    phoneNumber: "",
    categories: [],
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setUserData: (state, action: PayloadAction<USER>) => {
      state.user = action.payload;
    },
  },
});
export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
