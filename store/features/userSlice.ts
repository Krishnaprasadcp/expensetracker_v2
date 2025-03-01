import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateProp {
  userID: String;
}
const initialState: initialStateProp = {
  userID: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
  },
});
export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
