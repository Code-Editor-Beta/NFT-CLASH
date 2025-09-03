import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Clan, LeaderboardEntry } from '../types';

interface ClansState {
  clans: Clan[];
  selectedClan: Clan | null;
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    momentum: string[];
    sortBy: 'members' | 'trades' | 'floor' | 'name';
    sortOrder: 'asc' | 'desc';
  };
}

interface ClansActions {
  setClans: (clans: Clan[]) => void;
  addClan: (clan: Clan) => void;
  updateClan: (id: string, updates: Partial<Clan>) => void;
  setSelectedClan: (clan: Clan | null) => void;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<ClansState['filters']>) => void;
  joinClan: (clanId: string) => void;
  reset: () => void;
}

type ClansStore = ClansState & ClansActions;

const initialState: ClansState = {
  clans: [],
  selectedClan: null,
  leaderboard: [],
  isLoading: false,
  error: null,
  filters: {
    search: '',
    momentum: [],
    sortBy: 'trades',
    sortOrder: 'desc'
  }
};

export const useClansStore = create<ClansStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setClans: (clans) => {
        console.log('🏰 ClansStore: Setting clans:', clans.length);
        set({ clans, error: null }, false, 'setClans');
      },

      addClan: (clan) => {
        const { clans } = get();
        console.log('🏰 ClansStore: Adding clan:', clan.name);
        set({ clans: [...clans, clan] }, false, 'addClan');
      },

      updateClan: (id, updates) => {
        const { clans } = get();
        const updatedClans = clans.map(clan => 
          clan.id === id ? { ...clan, ...updates } : clan
        );
        console.log('🏰 ClansStore: Updating clan:', id, updates);
        set({ clans: updatedClans }, false, 'updateClan');
      },

      setSelectedClan: (selectedClan) => {
        console.log('🏰 ClansStore: Setting selected clan:', selectedClan?.name || 'none');
        set({ selectedClan }, false, 'setSelectedClan');
      },

      setLeaderboard: (leaderboard) => {
        console.log('🏆 ClansStore: Setting leaderboard:', leaderboard.length, 'entries');
        set({ leaderboard }, false, 'setLeaderboard');
      },

      setLoading: (isLoading) => {
        set({ isLoading }, false, 'setLoading');
      },

      setError: (error) => {
        console.log('❌ ClansStore: Setting error:', error);
        set({ error, isLoading: false }, false, 'setError');
      },

      setFilters: (newFilters) => {
        const { filters } = get();
        const updatedFilters = { ...filters, ...newFilters };
        console.log('🔍 ClansStore: Updating filters:', newFilters);
        set({ filters: updatedFilters }, false, 'setFilters');
      },

      joinClan: (clanId) => {
        const { clans } = get();
        const updatedClans = clans.map(clan => 
          clan.id === clanId 
            ? { ...clan, members: clan.members + 1 }
            : clan
        );
        console.log('🎮 ClansStore: Joined clan:', clanId);
        set({ clans: updatedClans }, false, 'joinClan');
      },

      reset: () => {
        console.log('🔄 ClansStore: Resetting state');
        set(initialState, false, 'reset');
      }
    }),
    {
      name: 'clans-store'
    }
  )
);
