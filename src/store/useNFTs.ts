import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { NFT } from '../types';

interface NFTsState {
  userNFTs: NFT[];
  clanNFTs: { [clanId: string]: NFT[] };
  isLoading: boolean;
  error: string | null;
  filters: {
    rarity: string[];
    staked: boolean | null;
    clan: string | null;
    sortBy: 'rarity' | 'name' | 'minted' | 'staked';
    sortOrder: 'asc' | 'desc';
  };
}

interface NFTsActions {
  setUserNFTs: (nfts: NFT[]) => void;
  setClanNFTs: (clanId: string, nfts: NFT[]) => void;
  addUserNFT: (nft: NFT) => void;
  addUserNFTs: (nfts: NFT[]) => void;
  updateNFT: (id: string, updates: Partial<NFT>) => void;
  stakeNFT: (id: string) => void;
  unstakeNFT: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<NFTsState['filters']>) => void;
  reset: () => void;
}

type NFTsStore = NFTsState & NFTsActions;

const initialState: NFTsState = {
  userNFTs: [],
  clanNFTs: {},
  isLoading: false,
  error: null,
  filters: {
    rarity: [],
    staked: null,
    clan: null,
    sortBy: 'minted',
    sortOrder: 'desc'
  }
};

export const useNFTsStore = create<NFTsStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setUserNFTs: (userNFTs) => {
        console.log('🖼️ NFTsStore: Setting user NFTs:', userNFTs.length);
        set({ userNFTs, error: null }, false, 'setUserNFTs');
      },

      setClanNFTs: (clanId, nfts) => {
        const { clanNFTs } = get();
        console.log(`🖼️ NFTsStore: Setting clan ${clanId} NFTs:`, nfts.length);
        set({ 
          clanNFTs: { ...clanNFTs, [clanId]: nfts } 
        }, false, 'setClanNFTs');
      },

      addUserNFT: (nft) => {
        const { userNFTs } = get();
        console.log('🖼️ NFTsStore: Adding user NFT:', nft.name);
        set({ userNFTs: [...userNFTs, nft] }, false, 'addUserNFT');
      },

      addUserNFTs: (nfts) => {
        const { userNFTs } = get();
        console.log('🖼️ NFTsStore: Adding user NFTs:', nfts.length);
        set({ userNFTs: [...userNFTs, ...nfts] }, false, 'addUserNFTs');
      },

      updateNFT: (id, updates) => {
        const { userNFTs, clanNFTs } = get();
        
        // Update in user NFTs
        const updatedUserNFTs = userNFTs.map(nft => 
          nft.id === id ? { ...nft, ...updates } : nft
        );
        
        // Update in clan NFTs
        const updatedClanNFTs = { ...clanNFTs };
        Object.keys(updatedClanNFTs).forEach(clanId => {
          updatedClanNFTs[clanId] = updatedClanNFTs[clanId].map(nft =>
            nft.id === id ? { ...nft, ...updates } : nft
          );
        });
        
        console.log('🖼️ NFTsStore: Updating NFT:', id, updates);
        set({ 
          userNFTs: updatedUserNFTs, 
          clanNFTs: updatedClanNFTs 
        }, false, 'updateNFT');
      },

      stakeNFT: (id) => {
        const { updateNFT } = get();
        console.log('🔒 NFTsStore: Staking NFT:', id);
        updateNFT(id, { staked: true });
      },

      unstakeNFT: (id) => {
        const { updateNFT } = get();
        console.log('🔓 NFTsStore: Unstaking NFT:', id);
        updateNFT(id, { staked: false });
      },

      setLoading: (isLoading) => {
        set({ isLoading }, false, 'setLoading');
      },

      setError: (error) => {
        console.log('❌ NFTsStore: Setting error:', error);
        set({ error, isLoading: false }, false, 'setError');
      },

      setFilters: (newFilters) => {
        const { filters } = get();
        const updatedFilters = { ...filters, ...newFilters };
        console.log('🔍 NFTsStore: Updating filters:', newFilters);
        set({ filters: updatedFilters }, false, 'setFilters');
      },

      reset: () => {
        console.log('🔄 NFTsStore: Resetting state');
        set(initialState, false, 'reset');
      }
    }),
    {
      name: 'nfts-store'
    }
  )
);
