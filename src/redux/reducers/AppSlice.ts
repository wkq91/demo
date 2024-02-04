import { UserData } from "@/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  darkMode: boolean;
  userData: UserData | null;
}

const initialState: AppState = {
  darkMode: false,
  userData: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkMode: (state: AppState, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setUserData: (state: AppState, action: PayloadAction<UserData | null>) => {
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
      state.userData = action.payload;
    },
  },
});

export const { setDarkMode, setUserData } = appSlice.actions;

export default appSlice.reducer;
