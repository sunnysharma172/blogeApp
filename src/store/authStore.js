// src/store/authStore.js
// import { create } from 'zustand';

// const useAuthStore = create((set) => ({
//   userData: null,
//   status: false,
//   login: (userData) => set({ status: true, userData }),
//   logout: () => set({ status: false, userData: null }),
// }));

// export default useAuthStore;


             //sec methed for redux toolkit


import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice( {
  name: 'auth',
  initialState,
  reducers:{
    login: ( state, action ) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: ( state ) => {
      state.status = false;
      state.userData = null;
    }
  }
});

export const {login,logout  } = authSlice.actions;
export default authSlice.reducer;