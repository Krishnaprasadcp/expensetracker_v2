import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateProp {
  userName: String;
}
const initialState: initialStateProp = {
  userName: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userData: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});
export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
