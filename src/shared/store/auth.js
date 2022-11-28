import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  userId: null,
  token: null,
  tokenExpDate: null,
  isLoggedIn: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      // console.log(action.payload);
      if (action.payload.isAdmin) {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.isLoggedIn = !!action.payload.token;
        state.isAdmin = action.payload.isAdmin;
        const tokenExpDate = action.payload.expTime
          ? new Date(action.payload.expTime)
          : new Date(new Date().getTime() + 1000 * 60 * 55);
        state.tokenExpDate = tokenExpDate.getTime();
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: action.payload.token,
            expTime: tokenExpDate.toISOString(),
            isAdmin: action.payload.isAdmin,
            userId: action.payload.userId,
          })
        );
        console.log(`Logged in!`);
      }
      // console.log(
      //   `token: ${state.token}; expDate: ${state.tokenExpDate}; userId: ${state.userId}; isLoggedIn: ${state.isLoggedIn}; watchlist: ${state.watchlist.length}`
      // );
    },
    logout(state) {
      state.userId = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.tokenExpDate = null;
      localStorage.removeItem("userData");
      // console.log(
      //   `token: ${state.token}; expDate: ${state.tokenExpDate}; userId: ${state.userId}; isLoggedIn: ${state.isLoggedIn}; watchlist: ${state.watchlist.length}`
      // );
      console.log("Logged out!");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
