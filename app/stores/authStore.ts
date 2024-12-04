import { create } from 'zustand';
import { Athlete } from '../services/authService'

interface AuthState {
  user: Athlete | null ;
  token: string | null;
  expiration: number | null;
  refreshToken: string | null;
  setUser: (user: Athlete | null) => void;
  setToken: (token: string | null) => void;
  setExpiration: (expiration: number | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  expiration: null,
  refreshToken: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setExpiration: (expiration) => set({ expiration }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  logout: () => set({ user: null, token: null, expiration: null, refreshToken: null }),
}));

export default useAuthStore;