import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockAPI } from '../mocks/api';
import { useUserStore } from '../store/useUser';
import { useClansStore } from '../store/useClans';
import { useNFTsStore } from '../store/useNFTs';
import { useLiveFeedStore } from '../store/useLiveFeed';
import toast from 'react-hot-toast';

// Query Keys
export const QUERY_KEYS = {
  user: ['user'] as const,
  clans: ['clans'] as const,
  clan: (id: string) => ['clan', id] as const,
  leaderboard: ['leaderboard'] as const,
  userNFTs: ['nfts', 'user'] as const,
  clanNFTs: (clanId: string) => ['nfts', 'clan', clanId] as const,
  globalActivity: ['activity', 'global'] as const,
  clanActivity: (clanId: string) => ['activity', 'clan', clanId] as const,
} as const;

// User Hooks
export const useUser = () => {
  const { setUser, setLoading, setError } = useUserStore();

  return useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await mockAPI.user.getProfile();
        if (response.success) {
          setUser(response.data);
          setError(null);
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch user');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useConnectWallet = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading, setError } = useUserStore();

  return useMutation({
    mutationFn: async (username: string) => {
      setLoading(true);
      const response = await mockAPI.user.connectWallet(username);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to connect wallet');
    },
    onSuccess: (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
      toast.success(`Welcome, ${user.username}! 🎮`);
    },
    onError: (error: Error) => {
      setError(error.message);
      toast.error(error.message);
    },
    onSettled: () => {
      setLoading(false);
    }
  });
};

// Clan Hooks
export const useClans = () => {
  const { setClans, setLoading, setError } = useClansStore();

  return useQuery({
    queryKey: QUERY_KEYS.clans,
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await mockAPI.clans.getClans();
        if (response.success) {
          setClans(response.data);
          setError(null);
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch clans');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
};

export const useClan = (clanId: string) => {
  const { setSelectedClan, setError } = useClansStore();

  return useQuery({
    queryKey: QUERY_KEYS.clan(clanId),
    queryFn: async () => {
      try {
        const response = await mockAPI.clans.getClan(clanId);
        if (response.success) {
          setSelectedClan(response.data);
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch clan');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        throw error;
      }
    },
    enabled: !!clanId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useJoinClan = () => {
  const queryClient = useQueryClient();
  const { joinClan } = useClansStore();
  const { updateUser } = useUserStore();

  return useMutation({
    mutationFn: async (clanId: string) => {
      const response = await mockAPI.clans.joinClan(clanId);
      if (response.success) {
        return clanId;
      }
      throw new Error(response.message || 'Failed to join clan');
    },
    onSuccess: (clanId) => {
      joinClan(clanId);
      updateUser({ clanId });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.clans });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
      toast.success('Successfully joined clan! ⚔️');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useLeaderboard = () => {
  const { setLeaderboard, setError } = useClansStore();

  return useQuery({
    queryKey: QUERY_KEYS.leaderboard,
    queryFn: async () => {
      try {
        const response = await mockAPI.clans.getLeaderboard();
        if (response.success) {
          setLeaderboard(response.data);
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch leaderboard');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        throw error;
      }
    },
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
};

// NFT Hooks
export const useUserNFTs = () => {
  const { setUserNFTs, setLoading, setError } = useNFTsStore();

  return useQuery({
    queryKey: QUERY_KEYS.userNFTs,
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await mockAPI.nfts.getUserNFTs();
        if (response.success) {
          setUserNFTs(response.data);
          setError(null);
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch user NFTs');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useClanNFTs = (clanId: string) => {
  const { setClanNFTs, setError } = useNFTsStore();

  return useQuery({
    queryKey: QUERY_KEYS.clanNFTs(clanId),
    queryFn: async () => {
      try {
        const response = await mockAPI.nfts.getClanNFTs(clanId);
        if (response.success) {
          setClanNFTs(clanId, response.data);
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch clan NFTs');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        throw error;
      }
    },
    enabled: !!clanId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useMintNFT = () => {
  const queryClient = useQueryClient();
  const { addUserNFTs } = useNFTsStore();
  const { user, updateUser } = useUserStore();

  return useMutation({
    mutationFn: async ({ clanId, quantity }: { clanId: string; quantity: number }) => {
      const response = await mockAPI.nfts.mintNFT(clanId, quantity);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to mint NFT');
    },
    onSuccess: (nfts) => {
      addUserNFTs(nfts);
      if (user) {
        updateUser({ nftsOwned: user.nftsOwned + nfts.length });
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userNFTs });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.globalActivity });
      toast.success(`Successfully minted ${nfts.length} NFT(s)! 🎨`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useStakeNFT = () => {
  const queryClient = useQueryClient();
  const { stakeNFT } = useNFTsStore();
  const { user, updateUser } = useUserStore();

  return useMutation({
    mutationFn: async (nftId: string) => {
      const response = await mockAPI.nfts.stakeNFT(nftId);
      if (response.success) {
        return nftId;
      }
      throw new Error(response.message || 'Failed to stake NFT');
    },
    onSuccess: (nftId) => {
      stakeNFT(nftId);
      if (user) {
        updateUser({ nftsStaked: user.nftsStaked + 1 });
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userNFTs });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.globalActivity });
      toast.success('NFT staked successfully! 🔒');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useUnstakeNFT = () => {
  const queryClient = useQueryClient();
  const { unstakeNFT } = useNFTsStore();
  const { user, updateUser } = useUserStore();

  return useMutation({
    mutationFn: async (nftId: string) => {
      const response = await mockAPI.nfts.unstakeNFT(nftId);
      if (response.success) {
        return nftId;
      }
      throw new Error(response.message || 'Failed to unstake NFT');
    },
    onSuccess: (nftId) => {
      unstakeNFT(nftId);
      if (user) {
        updateUser({ nftsStaked: Math.max(0, user.nftsStaked - 1) });
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userNFTs });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.globalActivity });
      toast.success('NFT unstaked successfully! 🔓');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

// Activity Hooks
export const useGlobalActivity = () => {
  const { setEvents, setLoading, setError } = useLiveFeedStore();

  return useQuery({
    queryKey: QUERY_KEYS.globalActivity,
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await mockAPI.activity.getGlobalActivity(1, 50);
        if (response.success) {
          setEvents(response.data.data);
          setError(null);
          return response.data.data;
        }
        throw new Error(response.message || 'Failed to fetch activity');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 15 * 1000, // Refetch every 15 seconds
  });
};

export const useClanActivity = (clanId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.clanActivity(clanId),
    queryFn: async () => {
      const response = await mockAPI.activity.getClanActivity(clanId, 1, 20);
      if (response.success) {
        return response.data.data;
      }
      throw new Error(response.message || 'Failed to fetch clan activity');
    },
    enabled: !!clanId,
    staleTime: 30 * 1000,
    refetchInterval: 15 * 1000,
  });
};
