import type { Clan, UserProfile, NFT, ActivityEvent } from '../types';

// ==========================================
// 🎮 ENHANCED MOCK DATA GENERATORS
// ==========================================
// This file generates 100 collections with 100 NFTs each
// Includes minting functionality and pool sharing system
// Total: 10,000 NFTs across 100 themed collections
// ==========================================

// 🏰 CLAN/COLLECTION THEMES AND PREFIXES
// Used to generate diverse collection names and themes
const CLAN_THEMES = [
  // Cyber/Tech themes
  { prefix: 'Cyber', emoji: '🤖', theme: 'Tech Warriors' },
  { prefix: 'Neon', emoji: '🌈', theme: 'Digital Lights' },
  { prefix: 'Quantum', emoji: '⚛️', theme: 'Quantum Realm' },
  { prefix: 'Plasma', emoji: '🔥', theme: 'Energy Beings' },
  { prefix: 'Digital', emoji: '💾', theme: 'Data Spirits' },
  { prefix: 'Hologram', emoji: '👻', theme: 'Light Projections' },
  { prefix: 'Matrix', emoji: '🔢', theme: 'Code Guardians' },
  { prefix: 'Binary', emoji: '🔣', theme: 'Logic Masters' },
  { prefix: 'Chrome', emoji: '🔘', theme: 'Metal Beings' },
  { prefix: 'Laser', emoji: '⚡', theme: 'Light Warriors' },
  
  // Mythical/Fantasy themes
  { prefix: 'Cosmic', emoji: '🌌', theme: 'Space Dwellers' },
  { prefix: 'Astral', emoji: '🌟', theme: 'Star Travelers' },
  { prefix: 'Void', emoji: '🕳️', theme: 'Dark Dimension' },
  { prefix: 'Crystal', emoji: '💎', theme: 'Gem Guardians' },
  { prefix: 'Shadow', emoji: '🌑', theme: 'Dark Arts' },
  { prefix: 'Lightning', emoji: '⚡', theme: 'Storm Bringers' },
  { prefix: 'Frost', emoji: '❄️', theme: 'Ice Kingdom' },
  { prefix: 'Flame', emoji: '🔥', theme: 'Fire Empire' },
  { prefix: 'Wind', emoji: '💨', theme: 'Air Nomads' },
  { prefix: 'Earth', emoji: '🌍', theme: 'Ground Force' },
  
  // Animal kingdoms
  { prefix: 'Alpha', emoji: '🐺', theme: 'Pack Leaders' },
  { prefix: 'Royal', emoji: '🦁', theme: 'Noble Beasts' },
  { prefix: 'Wild', emoji: '🐅', theme: 'Savage Hunters' },
  { prefix: 'Flying', emoji: '🦅', theme: 'Sky Rulers' },
  { prefix: 'Ocean', emoji: '🐋', theme: 'Sea Legends' },
  { prefix: 'Forest', emoji: '🦌', theme: 'Wood Spirits' },
  { prefix: 'Desert', emoji: '🐪', theme: 'Sand Walkers' },
  { prefix: 'Arctic', emoji: '🐧', theme: 'Ice Dwellers' },
  { prefix: 'Jungle', emoji: '🐒', theme: 'Vine Swingers' },
  { prefix: 'Mountain', emoji: '🐻', theme: 'Peak Climbers' }
];

// 🦄 ANIMAL TYPES FOR COLLECTION NAMES
const ANIMAL_TYPES = [
  'Dragons', 'Wolves', 'Lions', 'Eagles', 'Bears', 'Tigers', 'Hawks', 'Sharks', 
  'Panthers', 'Foxes', 'Ravens', 'Phoenixes', 'Unicorns', 'Griffins', 'Serpents',
  'Spiders', 'Scorpions', 'Beetles', 'Butterflies', 'Owls', 'Falcons', 'Whales',
  'Dolphins', 'Octopi', 'Jellyfish', 'Turtles', 'Rhinos', 'Elephants', 'Hippos',
  'Crocodiles', 'Cobras', 'Vipers', 'Pythons', 'Lizards', 'Geckos', 'Chameleons',
  'Rabbits', 'Deer', 'Horses', 'Zebras', 'Giraffes', 'Kangaroos', 'Koalas',
  'Pandas', 'Monkeys', 'Gorillas', 'Chimps', 'Sloths', 'Armadillos', 'Anteaters'
];

// 🎯 MOMENTUM TYPES (collection activity status)
const MOMENTUM_TYPES = ['hot', 'new', 'value', 'steady'] as const;

// 💰 POOL SHARING SYSTEM CONFIGURATION
export const POOL_CONFIG = {
  // Each NFT gives 0.1% share of the clan's total pool
  NFT_POOL_SHARE_PERCENTAGE: 0.001, // 0.1% as decimal
  
  // Base pool values for different momentum types
  BASE_POOL_VALUES: {
    hot: 50000,     // 50k APT base pool for hot collections
    new: 25000,     // 25k APT base pool for new collections  
    value: 75000,   // 75k APT base pool for value collections
    steady: 35000   // 35k APT base pool for steady collections
  },
  
  // Minimum mint price in APT
  MIN_MINT_PRICE: 0.05,
  MAX_MINT_PRICE: 0.25
};

// 🏭 ENHANCED CLAN GENERATOR - Creates 100 unique collections
export const generateMockClans = (): Clan[] => {
  const clans: Clan[] = [];
  
  // 🎲 GENERATE 100 UNIQUE COLLECTIONS
  // Loop through combinations to create diverse collections
  for (let i = 0; i < 100; i++) {
    const themeIndex = i % CLAN_THEMES.length;
    const animalIndex = Math.floor(i / CLAN_THEMES.length) % ANIMAL_TYPES.length;
    const theme = CLAN_THEMES[themeIndex];
    const animal = ANIMAL_TYPES[animalIndex];
    
    // 📊 Generate realistic collection stats
    const momentum = MOMENTUM_TYPES[Math.floor(Math.random() * MOMENTUM_TYPES.length)];
    const baseMembers = momentum === 'hot' ? 2000 : momentum === 'value' ? 1500 : momentum === 'new' ? 800 : 1200;
    const members = Math.floor(baseMembers + (Math.random() * 1000));
    const totalTrades24h = Math.floor(members * (0.3 + Math.random() * 0.5)); // 30-80% of members trade daily
    
    // 💎 Calculate floor price based on momentum and rarity
    const baseFloorPrice = momentum === 'hot' ? 3.0 : momentum === 'value' ? 4.5 : momentum === 'new' ? 1.0 : 2.0;
    const floorPrice = parseFloat((baseFloorPrice + (Math.random() * 2.0)).toFixed(2));
    
    // 🏗️ Generate founding date (last 12 months)
    const foundingDate = new Date();
    foundingDate.setDate(foundingDate.getDate() - Math.floor(Math.random() * 365));
    
    // 💰 Calculate mint price and pool value
    const mintPrice = parseFloat((POOL_CONFIG.MIN_MINT_PRICE + (Math.random() * (POOL_CONFIG.MAX_MINT_PRICE - POOL_CONFIG.MIN_MINT_PRICE))).toFixed(3));
    const poolBaseValue = POOL_CONFIG.BASE_POOL_VALUES[momentum];
    const poolVariation = poolBaseValue * (0.8 + Math.random() * 0.4); // ±20% variation
    
    clans.push({
      // 🆔 Unique identifiers
      id: `${theme.prefix.toLowerCase()}-${animal.toLowerCase()}`,
      name: `${theme.prefix} ${animal}`,
      icon: theme.emoji,
      emoji: theme.emoji,
      
      // 🖼️ Visual assets
      bannerUrl: `/banners/${theme.prefix.toLowerCase()}-${animal.toLowerCase()}.jpg`,
      
      // 📈 Collection statistics  
      members,
      memberCount: members,
      totalPower: Math.floor(members * (50 + Math.random() * 100)),
      totalTrades24h,
      floorPrice,
      momentum,
      
      // 📝 Collection details
      description: `${theme.theme} collection featuring legendary ${animal.toLowerCase()}`,
      founded: foundingDate.toISOString().split('T')[0],
      totalSupply: 100, // Each collection has exactly 100 NFTs
      mintPrice
    });
  }

  return clans;
};

// 👤 ENHANCED USER PROFILE GENERATOR
// Creates a user profile with clan membership and NFT holdings
export const generateMockUser = (): UserProfile => ({
  id: "user-1",
  username: "CryptoWarrior", 
  clanId: "cyber-dragons", // Default clan membership
  xp: 12847, // Experience points from activities
  streak: 7, // Daily login streak
  nftsOwned: 23, // Total NFTs owned across all collections
  nftsStaked: 18, // NFTs currently staked for rewards
  avatar: "/avatars/user-1.jpg",
  joinedAt: "2024-01-20",
  achievements: ["first-mint", "clan-loyalty", "staking-master", "trader-pro"] // User badges
});

// 🎨 ADVANCED NFT GENERATOR - Creates 10,000 NFTs (100 per collection)
// Each NFT has rarity, staking status, and pool share information
export const generateMockNFTs = (_targetCount: number = 10000): NFT[] => {
  const clans = generateMockClans(); // Get all 100 collections
  const nfts: NFT[] = [];
  
  // 🌟 NFT RARITY SYSTEM
  // Determines how rare each NFT is and affects pool shares
  const rarities: NFT['rarity'][] = ['common', 'rare', 'epic', 'legendary'];
  const rarityWeights = [0.60, 0.25, 0.12, 0.03]; // 60% common, 25% rare, 12% epic, 3% legendary
  
  // 🎭 NFT TRAIT CATEGORIES
  // Used to generate unique NFT names and characteristics
  const traitPrefixes = [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Omega', 'Prime', 'Elite', 'Royal', 
    'Ancient', 'Mystic', 'Shadow', 'Light', 'Dark', 'Golden', 'Silver', 'Bronze',
    'Fire', 'Ice', 'Storm', 'Earth', 'Void', 'Cosmic', 'Astral', 'Divine'
  ];
  
  // 🏭 GENERATE NFTs FOR EACH COLLECTION
  clans.forEach((clan, clanIndex) => {
    // Each collection gets exactly 100 NFTs
    for (let nftIndex = 1; nftIndex <= 100; nftIndex++) {
      // 🎲 Weighted random rarity selection
      const random = Math.random();
      let rarity: NFT['rarity'] = 'common';
      let cumulative = 0;
      
      for (let j = 0; j < rarities.length; j++) {
        cumulative += rarityWeights[j];
        if (random <= cumulative) {
          rarity = rarities[j];
          break;
        }
      }
      
      // 🎨 Generate unique NFT name
      const traitPrefix = traitPrefixes[Math.floor(Math.random() * traitPrefixes.length)];
      const nftName = `${traitPrefix} ${clan.name.split(' ')[1]} #${nftIndex}`;
      
      // 📅 Generate mint date (within last 6 months for new collections, longer for older ones)
      const clanAge = Date.now() - new Date(clan.founded || '2024-01-01').getTime();
      const maxAge = Math.min(clanAge, 180 * 24 * 60 * 60 * 1000); // Max 6 months
      const mintDate = new Date(Date.now() - Math.random() * maxAge);
      
      // 🔒 Determine staking status (70% of NFTs are staked)
      const isStaked = Math.random() > 0.3;
      
      nfts.push({
        // 🆔 Unique identifiers
        id: `${clan.id}-nft-${nftIndex}`,
        clanId: clan.id,
        
        // 🎨 Visual and metadata
        name: nftName,
        imageUrl: `/nfts/${clan.id}/${nftIndex}.jpg`,
        
        // 🌟 Rarity and economics  
        rarity,
        
        // 🔒 Staking and ownership
        staked: isStaked,
        
        // 📅 Timestamps
        mintedAt: mintDate.toISOString(),
        tokenId: (clanIndex * 100) + nftIndex, // Unique across all collections
      });
    }
  });
  
  // 📊 Shuffle NFTs to distribute across collections randomly in results
  return nfts.sort(() => Math.random() - 0.5);
};

// 📱 ENHANCED ACTIVITY FEED GENERATOR
// Creates realistic marketplace and staking activities
export const generateMockActivity = (count: number = 500): ActivityEvent[] => {
  const clans = generateMockClans();
  const users = [
    "CryptoWarrior", "NFTMaster", "DigitalNomad", "BlockchainBoss", 
    "MetaVerse", "CyberPunk", "QuantumLeap", "AstralTrader", 
    "NeonCollector", "VoidWalker", "CrystalMiner", "PlasmaHunter"
  ];
  const eventTypes = ['MINT', 'TRADE', 'STAKE', 'UNSTAKE', 'CLAN_MOMENTUM'] as const;
  
  return Array.from({ length: count }, (_, i) => {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomClan = clans[Math.floor(Math.random() * clans.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const timestamp = Date.now() - Math.random() * 24 * 60 * 60 * 1000; // Last 24 hours
    
    switch (eventType) {
      case 'MINT':
        return {
          type: 'MINT' as const,
          user: randomUser,
          clanId: randomClan.id,
          qty: Math.floor(Math.random() * 5) + 1, // 1-5 NFTs minted
          at: timestamp,
          nftIds: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => `${randomClan.id}-nft-${i}-${j}`)
        };
      case 'TRADE':
        return {
          type: 'TRADE' as const,
          user: randomUser,
          clanId: randomClan.id,
          nftId: `${randomClan.id}-nft-${i}`,
          at: timestamp,
          price: parseFloat((randomClan.floorPrice * (0.8 + Math.random() * 0.4)).toFixed(2)) // ±20% of floor price
        };
      case 'STAKE':
        return {
          type: 'STAKE' as const,
          user: randomUser,
          clanId: randomClan.id,
          nftId: `${randomClan.id}-nft-${i}`,
          at: timestamp
        };
      case 'UNSTAKE':
        return {
          type: 'UNSTAKE' as const,
          user: randomUser,
          clanId: randomClan.id,
          nftId: `${randomClan.id}-nft-${i}`,
          at: timestamp
        };
      case 'CLAN_MOMENTUM':
        return {
          type: 'CLAN_MOMENTUM' as const,
          clanId: randomClan.id,
          delta: Math.random() * 200 - 100, // -100 to +100 momentum change
          at: timestamp,
          reason: ["High trading volume", "New partnerships", "Staking rewards distributed", "Community event"][Math.floor(Math.random() * 4)]
        };
      default:
        return {
          type: 'MINT' as const,
          user: randomUser,
          clanId: randomClan.id,
          qty: 1,
          at: timestamp
        };
    }
  }).sort((a, b) => b.at - a.at); // Sort by newest first
};

// 🔍 COLLECTION SEARCH AND FILTERING UTILITIES
// Helps users quickly find collections they want to mint from

// 📊 Get collections by momentum type (hot, new, value, steady)
export const getClansByMomentum = (momentum: string): Clan[] => {
  return generateMockClans().filter(clan => clan.momentum === momentum);
};

// 🏷️ Get collections by category (tech, space, fantasy)  
export const getClansByCategory = (category: string): Clan[] => {
  const clans = generateMockClans();
  return clans.filter(clan => {
    const prefix = clan.name.split(' ')[0].toLowerCase();
    if (category === 'tech') {
      return ['cyber', 'neon', 'digital', 'matrix', 'binary', 'chrome', 'laser', 'hologram'].includes(prefix);
    }
    if (category === 'space') {
      return ['cosmic', 'astral', 'void', 'plasma', 'quantum'].includes(prefix);
    }
    if (category === 'fantasy') {
      return ['crystal', 'shadow', 'lightning', 'frost', 'flame', 'wind', 'earth'].includes(prefix);
    }
    return true;
  });
};

// 💰 Get collections by price range
export const getClansByPriceRange = (minPrice: number, maxPrice: number): Clan[] => {
  return generateMockClans().filter(clan => 
    clan.floorPrice >= minPrice && clan.floorPrice <= maxPrice
  );
};

// 🔤 Search collections by name or description
export const searchClans = (searchTerm: string): Clan[] => {
  const term = searchTerm.toLowerCase();
  return generateMockClans().filter(clan => 
    clan.name.toLowerCase().includes(term) || 
    (clan.description && clan.description.toLowerCase().includes(term))
  );
};

// 🎯 Get featured collections (top performers)
export const getFeaturedClans = (limit: number = 10): Clan[] => {
  return generateMockClans()
    .sort((a, b) => b.totalTrades24h - a.totalTrades24h) // Sort by trading volume
    .slice(0, limit);
};

// 🆕 Get newly launched collections (founded in last 30 days)
export const getNewClans = (): Clan[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return generateMockClans().filter(clan => 
    clan.founded && new Date(clan.founded) > thirtyDaysAgo
  );
};

// 📈 Get trending collections (high momentum score)
export const getTrendingClans = (): Clan[] => {
  return generateMockClans()
    .filter(clan => clan.momentum === 'hot')
    .sort((a, b) => b.totalTrades24h - a.totalTrades24h);
};

// 💎 MINTING FUNCTIONS
// Functions to handle NFT minting process

// 🏭 Mint NFT function - simulates the minting process
export const mintNFT = async (clanId: string, quantity: number = 1): Promise<{
  success: boolean;
  nfts?: NFT[];
  cost?: number;
  error?: string;
}> => {
  const clans = generateMockClans();
  const clan = clans.find(c => c.id === clanId);
  
  if (!clan) {
    return { success: false, error: "Collection not found" };
  }
  
  // 💰 Calculate total cost
  const totalCost = (clan.mintPrice || 0.1) * quantity;
  
  // 🎲 Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // 🎯 Generate minted NFTs
  const mintedNFTs: NFT[] = [];
  for (let i = 0; i < quantity; i++) {
    const tokenId = Date.now() + i; // Unique token ID
    const rarity = getMintRarity(); // Random rarity based on weights
    
    mintedNFTs.push({
      id: `${clanId}-nft-${tokenId}`,
      clanId: clanId,
      name: `${clan.name} #${tokenId}`,
      imageUrl: `/nfts/${clanId}/${tokenId}.jpg`,
      rarity,
      staked: false, // Newly minted NFTs start unstaked
      mintedAt: new Date().toISOString(),
      tokenId
    });
  }
  
  console.log(`🎉 Successfully minted ${quantity} NFTs from ${clan.name} for ${totalCost} APT`);
  
  return {
    success: true,
    nfts: mintedNFTs,
    cost: totalCost
  };
};

// 🎲 Helper function to determine mint rarity
const getMintRarity = (): NFT['rarity'] => {
  const random = Math.random();
  if (random < 0.03) return 'legendary'; // 3%
  if (random < 0.15) return 'epic';      // 12%
  if (random < 0.40) return 'rare';      // 25%
  return 'common';                       // 60%
};

// 🔒 Stake NFT function
export const stakeNFT = async (nftId: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  console.log(`🔒 Successfully staked NFT ${nftId} - earning pool rewards!`);
  return { success: true };
};

// 🔓 Unstake NFT function  
export const unstakeNFT = async (nftId: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  console.log(`🔓 Successfully unstaked NFT ${nftId}`);
  return { success: true };
};
