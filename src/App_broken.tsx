import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateMockClans, generateMockNFTs } from './mocks/seed';
import type { Clan, NFT } from './types';
import { 
  SLIDE_UP_VARIANTS, 
  FADE_VARIANTS, 
  SCALE_VARIANTS, 
  STAGGER_CONTAINER,
  animateCountUp 
} from './utils/animations';

function App() {
  console.log("🎮 App component rendering...");
  
  // 🎮 STATE MANAGEMENT
  const [currentView, setCurrentView] = useState<'landing' | 'clans' | 'nftGallery'>('landing');
  const [selectedClan, setSelectedClan] = useState<Clan | null>(null);
  const [animatedStats, setAnimatedStats] = useState({
    clans: 0,
    warriors: 0,
    nfts: 0,
    apt: 0
  });

  // 🎯 MOCK DATA with error handling
  let clans: Clan[] = [];
  let allNFTs: NFT[] = [];
  
  try {
    clans = generateMockClans();
    allNFTs = generateMockNFTs(1000);
    console.log("✅ Successfully loaded", clans.length, "clans and", allNFTs.length, "NFTs");
  } catch (error) {
    console.error("⚠️ Error loading mock data:", error);
    clans = generateMockClans(); // Use fallback
    allNFTs = generateMockNFTs();
  }

  // 🎬 Animate stats on mount
  useEffect(() => {
    const animateStatsSequence = () => {
      setTimeout(() => animateCountUp(0, clans.length, 1000, (value) => 
        setAnimatedStats(prev => ({ ...prev, clans: value }))), 300);
      setTimeout(() => animateCountUp(0, 50000, 1200, (value) => 
        setAnimatedStats(prev => ({ ...prev, warriors: value }))), 600);
      setTimeout(() => animateCountUp(0, allNFTs.length, 1400, (value) => 
        setAnimatedStats(prev => ({ ...prev, nfts: value }))), 900);
      setTimeout(() => animateCountUp(0, 2500000, 1600, (value) => 
        setAnimatedStats(prev => ({ ...prev, apt: value }))), 1200);
    };

    if (currentView === 'landing') {
      animateStatsSequence();
    }
  }, [currentView, clans.length, allNFTs.length]);
  
  // Filter NFTs based on selected clan
  const clanNFTs = selectedClan ? allNFTs.filter((nft: NFT) => nft.clanId === selectedClan.id) : [];
  
  // For demo purposes, show all NFTs in the selected clan
  const filteredNFTs = clanNFTs;

  // 🎨 RARITY COLORS
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#fbbf24';
      case 'epic': return '#a855f7';
      case 'rare': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  // 🏆 CLAN SELECTION HANDLER
  const handleJoinClan = (clan: Clan) => {
    console.log("🏰 Joining clan:", clan.name);
    setSelectedClan(clan);
    setCurrentView('nftGallery');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0066] to-black text-white font-inter relative overflow-hidden">
      
      {/* 🌟 ANIMATED BACKGROUND */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-40 right-40 w-64 h-64 bg-pink-500 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-emerald-500 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* 🎮 LANDING PAGE */}
      {currentView === 'landing' && (
        <motion.div
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 text-center"
          variants={FADE_VARIANTS}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 60px rgba(147, 51, 234, 0.3)',
            }}
            variants={SLIDE_UP_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ⚡ NFT CLAN VAULTS ⚡
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl opacity-90 max-w-4xl mx-auto mb-12 leading-relaxed"
            variants={SLIDE_UP_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            🎮 Join epic clans, collect legendary NFTs, and dominate the arena! 
            <br className="hidden md:block" />
            💰 Stake your warriors and earn from the clan treasure vault!
          </motion.p>

          <motion.button
            onClick={() => setCurrentView('clans')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 
                     px-12 py-6 rounded-2xl text-xl font-bold text-white 
                     shadow-lg hover:shadow-purple-500/25 transform transition-all duration-300
                     border border-purple-400/30 backdrop-blur-sm"
            variants={SCALE_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 ENTER THE ARENA
          </motion.button>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full mt-20"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: 'Total Clans', value: animatedStats.clans, suffix: '', color: 'from-blue-400 to-blue-600' },
              { label: 'Active Warriors', value: animatedStats.warriors, suffix: '+', color: 'from-emerald-400 to-emerald-600' },
              { label: 'NFTs Minted', value: animatedStats.nfts, suffix: '', color: 'from-purple-400 to-purple-600' },
              { label: 'APT Staked', value: animatedStats.apt, suffix: '', color: 'from-amber-400 to-amber-600' }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10
                         hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                variants={SLIDE_UP_VARIANTS}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className={`text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm md:text-base opacity-70 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* 🏰 CLAN SELECTION PAGE */}
      {currentView === 'clans' && (
        <motion.div
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            padding: '32px'
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: '48px'
            }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '900',
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
            }}>
              ⚡ CHOOSE YOUR CLAN ⚡
            </h1>
            <p style={{
              fontSize: '1.3rem',
              opacity: 0.85,
              maxWidth: '650px',
              margin: '0 auto 32px',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '16px 32px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              � Each clan has unique powers and legendary NFTs. Choose wisely, warrior!
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.button
            onClick={() => setCurrentView('landing')}
            style={{
              position: 'absolute',
              top: '32px',
              left: '32px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '12px 24px',
              color: 'white',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              fontSize: '1rem',
              fontWeight: '600'
            }}
            whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Arena
          </motion.button>

          {/* Clans Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {clans.slice(0, 12).map((clan: any, index: number) => (
              <motion.div
                key={clan.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '24px',
                  padding: '32px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.5 + index * 0.15,
                  duration: 0.6,
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  border: '2px solid rgba(59, 130, 246, 0.6)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleJoinClan(clan)}
              >
                {/* Clan Icon */}
                <div style={{
                  fontSize: '4.5rem',
                  textAlign: 'center',
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))'
                }}>
                  {clan.icon}
                </div>

                {/* Clan Name */}
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  textAlign: 'center',
                  marginBottom: '12px',
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                }}>
                  {clan.name}
                </h3>

                {/* Clan Description */}
                <p style={{
                  textAlign: 'center',
                  opacity: 0.8,
                  marginBottom: '20px',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  lineHeight: '1.5',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {clan.description || 'Legendary collection awaiting brave warriors'}
                </p>

                {/* Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <div style={{ 
                      fontSize: '1.4rem', 
                      fontWeight: '800', 
                      color: '#3b82f6',
                      textShadow: '0 0 10px rgba(59, 130, 246, 0.4)'
                    }}>
                      {clan.members?.toLocaleString() || '1K+'}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: '600' }}>Warriors</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <div style={{ 
                      fontSize: '1.4rem', 
                      fontWeight: '800', 
                      color: '#8b5cf6',
                      textShadow: '0 0 10px rgba(139, 92, 246, 0.4)'
                    }}>
                      {(clan.floorPrice || 0).toFixed(1)}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: '600' }}>Floor Price</div>
                  </div>
                </div>

                {/* Join Button */}
                <div style={{
                  textAlign: 'center'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    padding: '14px 32px',
                    borderRadius: '16px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}>
                    🚀 JOIN CLAN
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 🎨 NFT Gallery and Detail views will be added next... */}
      {currentView === 'nftGallery' && selectedClan && (
        <motion.div
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            padding: '32px',
            textAlign: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '32px'
          }}>
            {selectedClan.icon} {selectedClan.name} Collection
          </h1>
          
          <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '32px' }}>
            🎨 NFT Gallery coming soon! Found {filteredNFTs.length} NFTs in this collection.
          </p>
          
          <button
            onClick={() => setCurrentView('clans')}
            style={{
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            ← Back to Clans
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default App;
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            padding: '32px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '48px',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: getRarityColor(selectedNFT.rarity),
              marginBottom: '16px'
            }}>
              {selectedNFT.name}
            </h1>
            
            <div style={{
              background: getRarityColor(selectedNFT.rarity),
              color: 'white',
              padding: '8px 16px',
              borderRadius: '12px',
              display: 'inline-block',
              marginBottom: '24px',
              textTransform: 'capitalize',
              fontWeight: '700'
            }}>
              {selectedNFT.rarity} NFT
            </div>
            
            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '32px' }}>
              Token #{selectedNFT.tokenId}
            </p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={() => setCurrentView('nftGallery')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                ← Back to Gallery
              </button>
              
              <button
                onClick={() => alert(`� ${selectedNFT.name} staked successfully!`)}
                style={{
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                🔒 Stake NFT
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;