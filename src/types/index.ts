export type Clan = {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  bannerUrl?: string;
  members: number;
  memberCount: number;
  totalPower: number;
  totalTrades24h: number;
  floorPrice: number;
  momentum: "hot" | "new" | "value" | "steady";
  description?: string;
  founded?: string;
  totalSupply?: number;
  mintPrice?: number;
};

export type UserProfile = {
  id: string;
  username: string;
  clanId?: string;
  xp: number;
  streak: number;
  nftsOwned: number;
  nftsStaked: number;
  avatar?: string;
  joinedAt?: string;
  achievements?: string[];
};

export type NFT = {
  id: string;
  clanId: string;
  imageUrl?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  staked: boolean;
  name?: string;
  mintedAt?: string;
  tokenId?: number;
};

export type ActivityEvent =
  | { type: "MINT"; user: string; clanId: string; qty: number; at: number; nftIds?: string[] }
  | { type: "TRADE"; user: string; clanId: string; nftId: string; at: number; price?: number }
  | { type: "STAKE" | "UNSTAKE"; user: string; clanId: string; nftId: string; at: number }
  | { type: "CLAN_MOMENTUM"; clanId: string; delta: number; at: number; reason?: string };

export type WarStatus = {
  id: string;
  clan1: string;
  clan2: string;
  clan1Score: number;
  clan2Score: number;
  endTime: number;
  status: "active" | "ended";
  prize?: string;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedAt?: string;
};

export type StakingReward = {
  id: string;
  userId: string;
  nftId: string;
  amount: number;
  claimedAt?: string;
  pendingReward: number;
};

export type LeaderboardEntry = {
  rank: number;
  clanId: string;
  clanName: string;
  metric: number;
  change: number; // positive for up, negative for down
  trend: "up" | "down" | "stable";
};

export type MockAPIResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
  timestamp: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type ChartDataPoint = {
  timestamp: number;
  value: number;
  label?: string;
};
