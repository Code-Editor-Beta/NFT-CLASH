import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UserProfile } from '../types';

interface UserState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

interface UserActions {
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConnected: (connected: boolean) => void;
  clearUser: () => void;
  reset: () => void;
}

type UserStore = UserState & UserActions;

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  isConnected: false
};

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setUser: (user) => {
        console.log('👤 UserStore: Setting user:', user.username);
        set({ user, error: null, isConnected: true }, false, 'setUser');
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (!currentUser) return;
        
        const updatedUser = { ...currentUser, ...updates };
        console.log('👤 UserStore: Updating user:', updates);
        set({ user: updatedUser }, false, 'updateUser');
      },

      setLoading: (isLoading) => {
        set({ isLoading }, false, 'setLoading');
      },

      setError: (error) => {
        console.log('❌ UserStore: Setting error:', error);
        set({ error, isLoading: false }, false, 'setError');
      },

      setConnected: (isConnected) => {
        set({ isConnected }, false, 'setConnected');
      },

      clearUser: () => {
        console.log('👤 UserStore: Clearing user');
        set({ user: null, isConnected: false, error: null }, false, 'clearUser');
      },

      reset: () => {
        console.log('🔄 UserStore: Resetting state');
        set(initialState, false, 'reset');
      }
    }),
    {
      name: 'user-store'
    }
  )
);
