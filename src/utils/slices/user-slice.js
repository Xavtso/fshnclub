import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    isLoggedIn: false,
    name: null,
    role: null,
  },
  reducers: {
    logIn(state, action) {
      // Data Decomposition
      const token = action.payload;
      if (!token) throw new Error("Some error");
      const undecodedToken = jwtDecode(action.payload);
      const { id, name, role } = undecodedToken;

      // Set up UserData States
      state.id = id;
      state.name = name;
      state.role = role;

      // Store UserData
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      state.isLoggedIn = true;
    },
    checkIfLogin(state, action) {
      // Trying to receive token
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const id = localStorage.getItem("id");
      const name = localStorage.getItem("name");

      if (!token || token === "") {
        state.isLoggedIn = false;
        return;
      }
      // Check if token is valid
      const undecodedToken = jwtDecode(token);
      const unixDateNow = Math.floor(Date.now() / 1000);
      if (undecodedToken.exp <= unixDateNow) {
        state.isLoggedIn = false;
      } else {
          state.isLoggedIn = true;
          state.id = id;
        state.role = role;
        state.name = name;
      }
    },

    logOut(state, action) {
      state.isLoggedIn = false;
      state.id = null;
      state.name = null;
      state.role = null;
      localStorage.clear();
    }
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice;
