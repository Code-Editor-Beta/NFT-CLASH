import type { Clan, UserProfile, NFT, ActivityEvent, MockAPIResponse, PaginatedResponse, LeaderboardEntry } from '../types';
import { generateMockClans, generateMockUser, generateMockNFTs, generateMockActivity } from './seed';

// Simulate network latency
const delay = (ms: number = 300 + Math.random() * 700) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Global mock state
let mockClans = generateMockClans();
let mockUser = generateMockUser();
let mockNFTs = generateMockNFTs(50);
let mockActivity = generateMockActivity(100);

// Helper to wrap responses
const createResponse = <T>(data: T, success: boolean = true, message?: string): MockAPIResponse<T> => ({
  data,
  success,
  message,
  timestamp: Date.now()
});

// Clan API
export const mockClanAPI = {
  async getClans(): Promise<MockAPIResponse<Clan[]>> {
    console.log('🔍 API: Fetching all clans...');
    await delay();
    return createResponse(mockClans);
  },

  async getClan(id: string): Promise<MockAPIResponse<Clan | null>> {
    console.log(`🔍 API: Fetching clan ${id}...`);
    await delay();
    const clan = mockClans.find(c => c.id === id);
    return createResponse(clan || null, !!clan, clan ? undefined : 'Clan not found');
  },

  async joinClan(clanId: string): Promise<MockAPIResponse<boolean>> {
    console.log(`🎮 API: Joining clan ${clanId}...`);
    await delay();
    
    // Update user's clan
    mockUser.clanId = clanId;
    
    // Update clan member count
    const clan = mockClans.find(c => c.id === clanId);
    if (clan) {
      clan.members += 1;
    }
    
    return createResponse(true, true, 'Successfully joined clan!');
  },

  async getLeaderboard(): Promise<MockAPIResponse<LeaderboardEntry[]>> {
    console.log('🏆 API: Fetching clan leaderboard...');
    await delay();
    
    const leaderboard: LeaderboardEntry[] = mockClans
      .map((clan, index) => ({
        rank: index + 1,
        clanId: clan.id,
        clanName: clan.name,
        metric: clan.totalTrades24h,
        change: Math.floor(Math.random() * 200 - 100),
        trend: (Math.random() > 0.5 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable') as 'up' | 'down' | 'stable'
      }))
      .sort((a, b) => b.metric - a.metric)
      .slice(0, 10);
    
    return createResponse(leaderboard);
  }
};

// User API
export const mockUserAPI = {
  async getProfile(): Promise<MockAPIResponse<UserProfile>> {
    console.log('👤 API: Fetching user profile...');
    await delay();
    return createResponse(mockUser);
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<MockAPIResponse<UserProfile>> {
    console.log('👤 API: Updating user profile...', updates);
    await delay();
    mockUser = { ...mockUser, ...updates };
    return createResponse(mockUser);
  },

  async connectWallet(username: string): Promise<MockAPIResponse<UserProfile>> {
    console.log(`🔗 API: Connecting wallet for ${username}...`);
    await delay();
    mockUser.username = username;
    return createResponse(mockUser);
  }
};

// NFT API
export const mockNFTAPI = {
  async getUserNFTs(userId?: string): Promise<MockAPIResponse<NFT[]>> {
    console.log(`🖼️ API: Fetching NFTs for user ${userId || 'current'}...`);
    await delay();
    
    // Filter to show some NFTs as owned by current user
    const userNFTs = mockNFTs.filter((_, index) => index < mockUser.nftsOwned);
    return createResponse(userNFTs);
  },

  async getClanNFTs(clanId: string): Promise<MockAPIResponse<NFT[]>> {
    console.log(`🖼️ API: Fetching NFTs for clan ${clanId}...`);
    await delay();
    
    const clanNFTs = mockNFTs.filter(nft => nft.clanId === clanId);
    return createResponse(clanNFTs);
  },

  async mintNFT(clanId: string, quantity: number): Promise<MockAPIResponse<NFT[]>> {
    console.log(`🎨 API: Minting ${quantity} NFT(s) for clan ${clanId}...`);
    await delay();
    
    const newNFTs: NFT[] = Array.from({ length: quantity }, (_, i) => ({
      id: `nft-${Date.now()}-${i}`,
      clanId,
      imageUrl: `/nfts/${clanId}/${Date.now()}-${i}.jpg`,
      rarity: Math.random() > 0.8 ? 'rare' : Math.random() > 0.95 ? 'epic' : 'common' as const,
      staked: false,
      name: `${mockClans.find(c => c.id === clanId)?.name} #${mockNFTs.length + i + 1}`,
      mintedAt: new Date().toISOString(),
      tokenId: mockNFTs.length + i + 1
    }));
    
    mockNFTs.push(...newNFTs);
    mockUser.nftsOwned += quantity;
    
    // Add mint activity
    mockActivity.unshift({
      type: 'MINT',
      user: mockUser.username,
      clanId,
      qty: quantity,
      at: Date.now(),
      nftIds: newNFTs.map(nft => nft.id)
    });
    
    return createResponse(newNFTs, true, `Successfully minted ${quantity} NFT(s)!`);
  },

  async stakeNFT(nftId: string): Promise<MockAPIResponse<boolean>> {
    console.log(`🔒 API: Staking NFT ${nftId}...`);
    await delay();
    
    const nft = mockNFTs.find(n => n.id === nftId);
    if (!nft) {
      return createResponse(false, false, 'NFT not found');
    }
    
    nft.staked = true;
    mockUser.nftsStaked += 1;
    
    // Add stake activity
    mockActivity.unshift({
      type: 'STAKE',
      user: mockUser.username,
      clanId: nft.clanId,
      nftId,
      at: Date.now()
    });
    
    return createResponse(true, true, 'NFT staked successfully!');
  },

  async unstakeNFT(nftId: string): Promise<MockAPIResponse<boolean>> {
    console.log(`🔓 API: Unstaking NFT ${nftId}...`);
    await delay();
    
    const nft = mockNFTs.find(n => n.id === nftId);
    if (!nft) {
      return createResponse(false, false, 'NFT not found');
    }
    
    nft.staked = false;
    mockUser.nftsStaked -= 1;
    
    // Add unstake activity
    mockActivity.unshift({
      type: 'UNSTAKE',
      user: mockUser.username,
      clanId: nft.clanId,
      nftId,
      at: Date.now()
    });
    
    return createResponse(true, true, 'NFT unstaked successfully!');
  }
};

// Activity API
export const mockActivityAPI = {
  async getGlobalActivity(page: number = 1, limit: number = 20): Promise<MockAPIResponse<PaginatedResponse<ActivityEvent>>> {
    console.log(`📊 API: Fetching global activity (page ${page}, limit ${limit})...`);
    await delay();
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = mockActivity.slice(startIndex, endIndex);
    
    return createResponse({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: mockActivity.length,
        hasNext: endIndex < mockActivity.length,
        hasPrev: page > 1
      }
    });
  },

  async getClanActivity(clanId: string, page: number = 1, limit: number = 20): Promise<MockAPIResponse<PaginatedResponse<ActivityEvent>>> {
    console.log(`📊 API: Fetching activity for clan ${clanId}...`);
    await delay();
    
    const clanActivity = mockActivity.filter(event => event.clanId === clanId);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = clanActivity.slice(startIndex, endIndex);
    
    return createResponse({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: clanActivity.length,
        hasNext: endIndex < clanActivity.length,
        hasPrev: page > 1
      }
    });
  }
};

// Admin API for triggering mock events
export const mockAdminAPI = {
  async triggerMockMint(clanId: string, quantity: number = 1): Promise<MockAPIResponse<boolean>> {
    console.log(`🎭 ADMIN: Triggering mock mint for ${clanId}...`);
    await delay(100);
    
    const users = ["TestUser1", "TestUser2", "TestUser3"];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    mockActivity.unshift({
      type: 'MINT',
      user: randomUser,
      clanId,
      qty: quantity,
      at: Date.now()
    });
    
    return createResponse(true, true, 'Mock mint event triggered!');
  },

  async triggerMockTrade(clanId: string): Promise<MockAPIResponse<boolean>> {
    console.log(`🎭 ADMIN: Triggering mock trade for ${clanId}...`);
    await delay(100);
    
    const users = ["TraderA", "TraderB", "TraderC"];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    mockActivity.unshift({
      type: 'TRADE',
      user: randomUser,
      clanId,
      nftId: `nft-${Date.now()}`,
      at: Date.now(),
      price: Math.random() * 10 + 0.5
    });
    
    return createResponse(true, true, 'Mock trade event triggered!');
  },

  async setClanMomentum(clanId: string, momentum: Clan['momentum']): Promise<MockAPIResponse<boolean>> {
    console.log(`🎭 ADMIN: Setting clan ${clanId} momentum to ${momentum}...`);
    await delay(100);
    
    const clan = mockClans.find(c => c.id === clanId);
    if (clan) {
      clan.momentum = momentum;
    }
    
    mockActivity.unshift({
      type: 'CLAN_MOMENTUM',
      clanId,
      delta: momentum === 'hot' ? 50 : momentum === 'new' ? 25 : momentum === 'value' ? 10 : 0,
      at: Date.now(),
      reason: `Admin set momentum to ${momentum}`
    });
    
    return createResponse(true, true, `Clan momentum set to ${momentum}!`);
  }
};

// Export all APIs
export const mockAPI = {
  clans: mockClanAPI,
  user: mockUserAPI,
  nfts: mockNFTAPI,
  activity: mockActivityAPI,
  admin: mockAdminAPI
};
