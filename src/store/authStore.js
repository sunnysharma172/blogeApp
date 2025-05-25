// src/store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  userData: null,
  status: false,
  login: (userData) => set({ status: true, userData }),
  logout: () => set({ status: false, userData: null }),
}));

export default useAuthStore;
