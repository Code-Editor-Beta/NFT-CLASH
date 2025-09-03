import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateMockClans, generateMockNFTs } from "./mocks/seed";
import type { Clan } from "./types";
import {
  SLIDE_UP_VARIANTS,
  FADE_VARIANTS,
  SCALE_VARIANTS,
  STAGGER_CONTAINER,
  animateCountUp,
} from "./utils/animations";

type GameView = "welcome" | "rules" | "consent" | "wallet" | "clans" | "arena";
type ArenaTab = "trading" | "stats" | "collection" | "treasure" | "upgrade";

function App() {
  console.log("🎮 NFT Clan Wars - Ultimate Battle Arena!");

  // 🎮 CORE GAME STATE
  const [currentView, setCurrentView] = useState<GameView>("welcome");
  const [selectedClan, setSelectedClan] = useState<Clan | null>(null);
  const [hasStarterCard, setHasStarterCard] = useState(false);
  const [currentWeek] = useState(1);
  const [userConsent, setUserConsent] = useState(false);

  // 🏟️ ARENA STATE
  const [activeTab, setActiveTab] = useState<ArenaTab>("trading");
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [userBid, setUserBid] = useState<string>("");
  const [upgradeNFT, setUpgradeNFT] = useState<any>(null);

  // 📊 ANIMATED STATS
  const [animatedStats, setAnimatedStats] = useState({
    totalClans: 0,
    activeBattles: 0,
    weeklyPrize: 0,
    warriors: 0,
  });

  // 🎯 MOCK DATA
  let clans: Clan[] = [];
  let allNFTs: any[] = [];

  try {
    clans = generateMockClans();
    allNFTs = generateMockNFTs(1000);
    console.log(
      `🏟️ Generated ${clans.length} clans and ${allNFTs.length} NFTs`
    );
  } catch (error) {
    console.error("❌ Error generating mock data:", error);
  }

  // 🏆 BATTLE SYSTEM DATA
  const mockBattles = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    clan1: clans[Math.floor(Math.random() * clans.length)],
    clan2: clans[Math.floor(Math.random() * clans.length)],
    status: ["upcoming", "live", "completed"][Math.floor(Math.random() * 3)],
    week: Math.floor(index / 10) + 1,
    prizePool: Math.floor(Math.random() * 10000) + 5000,
    clan1Score: Math.floor(Math.random() * 1000),
    clan2Score: Math.floor(Math.random() * 1000),
  }));

  // 💰 TREASURE DATA
  const mockTreasures = [
    {
      id: 1,
      name: "Weekly Champion Chest",
      value: 50000,
      rarity: "legendary",
      claimed: false,
    },
    {
      id: 2,
      name: "Battle Victory Reward",
      value: 5000,
      rarity: "epic",
      claimed: true,
    },
    {
      id: 3,
      name: "Clan Participation Bonus",
      value: 1000,
      rarity: "rare",
      claimed: false,
    },
    {
      id: 4,
      name: "Daily Login Streak",
      value: 500,
      rarity: "common",
      claimed: false,
    },
  ];

  // 🎮 STARTER CARD PRICING
  const starterCardPrice = 10; // APT

  // 📊 ANIMATED STATS EFFECT
  useEffect(() => {
    const animateStatsSequence = () => {
      setTimeout(
        () =>
          animateCountUp(0, 100, 1000, (value) =>
            setAnimatedStats((prev) => ({ ...prev, totalClans: value }))
          ),
        300
      );
      setTimeout(
        () =>
          animateCountUp(0, 50, 1200, (value) =>
            setAnimatedStats((prev) => ({ ...prev, activeBattles: value }))
          ),
        600
      );
      setTimeout(
        () =>
          animateCountUp(0, 1000000, 1400, (value) =>
            setAnimatedStats((prev) => ({ ...prev, weeklyPrize: value }))
          ),
        900
      );
      setTimeout(
        () =>
          animateCountUp(0, 25000, 1600, (value) =>
            setAnimatedStats((prev) => ({ ...prev, warriors: value }))
          ),
        1200
      );
    };

    if (currentView === "welcome") {
      animateStatsSequence();
    }
  }, [currentView]);

  // Filter NFTs based on selected clan
  const clanNFTs = selectedClan
    ? allNFTs.filter((nft: any) => nft.clanId === selectedClan.id)
    : [];

  // 🎮 TRADING DATA
  const mockTradingNFTs = clanNFTs.slice(0, 8).map((nft, index) => ({
    ...nft,
    currentBid: (Math.random() * 5 + 0.5).toFixed(2),
    minBid: (Math.random() * 3 + 0.3).toFixed(2),
    bidCount: Math.floor(Math.random() * 15) + 1,
    timeLeft: Math.floor(Math.random() * 86400) + 3600,
    seller: ["CryptoKing", "NFTMaster", "WarriorX", "DragonSlayer"][index % 4],
    level: Math.floor(Math.random() * 50) + 1,
    power: Math.floor(Math.random() * 1000) + 100,
    experience: Math.floor(Math.random() * 10000),
    wins: Math.floor(Math.random() * 100),
    losses: Math.floor(Math.random() * 50),
  }));

  const mockUserCollection = allNFTs.slice(0, 6).map((nft, index) => ({
    ...nft,
    level: Math.floor(Math.random() * 30) + 5,
    power: Math.floor(Math.random() * 800) + 200,
    experience: Math.floor(Math.random() * 8000) + 1000,
    isStaked: index % 3 === 0,
    dailyReward: (Math.random() * 2 + 0.1).toFixed(3),
    upgradeCost: Math.floor(Math.random() * 50) + 10,
  }));

  // 🎯 EVENT HANDLERS
  const handleConnectWallet = () => {
    setCurrentView("clans");
    console.log("🔗 Wallet connected successfully!");
  };

  const handleBuyStarterCard = () => {
    setHasStarterCard(true);
    setCurrentView("arena");
    console.log(`💳 Starter card purchased for ${starterCardPrice} APT!`);
  };

  const handleClanSelect = (clan: Clan) => {
    setSelectedClan(clan);
    if (!hasStarterCard) {
      const confirm = window.confirm(
        `To join ${clan.name}, you need a starter card (${starterCardPrice} APT). Purchase now?`
      );
      if (confirm) {
        handleBuyStarterCard();
      }
    } else {
      setCurrentView("arena");
    }
  };

  const handleTabChange = (tab: ArenaTab) => {
    setActiveTab(tab);
    console.log(`🎮 Switched to ${tab} tab`);
  };

  const handlePlaceBid = (nft: any) => {
    if (!userBid || parseFloat(userBid) <= parseFloat(nft.currentBid)) {
      alert("⚠️ Bid must be higher than current bid!");
      return;
    }
    alert(`🎉 Bid of ${userBid} APT placed on ${nft.name}!`);
    setUserBid("");
  };

  const handleUpgradeNFT = (nft: any) => {
    alert(
      `🔥 ${nft.name} upgraded for ${nft.upgradeCost} APT! Level increased!`
    );
  };

  const handleClaimTreasure = (treasure: any) => {
    alert(`💰 Claimed ${treasure.name} worth ${treasure.value} APT!`);
  };

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <AnimatePresence mode="wait">
        {/* 🎉 WELCOME SCREEN */}
        {currentView === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
              className="text-center space-y-8"
            >
              <motion.h1
                variants={SLIDE_UP_VARIANTS}
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
              >
                NFT CLAN WARS
              </motion.h1>

              <motion.p
                variants={SLIDE_UP_VARIANTS}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              >
                Enter the ultimate arena where 100 clans battle in epic weekly
                contests for massive treasures!
              </motion.p>

              {/* Live Stats */}
              <motion.div
                variants={SLIDE_UP_VARIANTS}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              >
                {[
                  {
                    label: "Total Clans",
                    value: animatedStats.totalClans,
                    suffix: "",
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    label: "Active Battles",
                    value: animatedStats.activeBattles,
                    suffix: "",
                    color: "from-green-400 to-green-600",
                  },
                  {
                    label: "Weekly Prize",
                    value: animatedStats.weeklyPrize,
                    suffix: "APT",
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    label: "Warriors",
                    value: animatedStats.warriors,
                    suffix: "",
                    color: "from-amber-400 to-amber-600",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20"
                  >
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.button
                variants={SCALE_VARIANTS}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView("rules")}
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                ENTER THE ARENA
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* 📜 GAME RULES */}
        {currentView === "rules" && (
          <motion.div
            key="rules"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto text-center space-y-8"
            >
              <motion.h1
                variants={SLIDE_UP_VARIANTS}
                className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              >
                BATTLE RULES
              </motion.h1>

              <motion.div
                variants={SLIDE_UP_VARIANTS}
                className="grid md:grid-cols-2 gap-6 text-left"
              >
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">
                    🏆 Weekly Contests
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 100 unique clans compete every week</li>
                    <li>• 50 epic battles determine winners</li>
                    <li>• Massive prize pools distributed to top clans</li>
                    <li>• Your clan's score determines victory</li>
                  </ul>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-green-400 mb-4">
                    ⚔️ Battle System
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Join a clan by purchasing starter card</li>
                    <li>• Trade NFTs to boost your clan's power</li>
                    <li>• Upgrade your warriors for higher scores</li>
                    <li>• Stake NFTs to earn daily rewards</li>
                  </ul>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">
                    💰 Treasure System
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Win battles to earn treasure chests</li>
                    <li>• Claim daily, weekly, and special rewards</li>
                    <li>• Top clans split the grand prize pool</li>
                    <li>• Participate to earn bonus treasures</li>
                  </ul>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-pink-400 mb-4">
                    🎯 Scoring Strategy
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Higher level NFTs = more points</li>
                    <li>• Trading activity boosts clan score</li>
                    <li>• Staking multiplies your contributions</li>
                    <li>• Team coordination is key to victory</li>
                  </ul>
                </div>
              </motion.div>

              <motion.button
                variants={SCALE_VARIANTS}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView("consent")}
                className="px-12 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl font-bold text-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                I UNDERSTAND, LET'S FIGHT!
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ✅ CONSENT SCREEN */}
        {currentView === "consent" && (
          <motion.div
            key="consent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
              className="max-w-2xl mx-auto text-center space-y-8"
            >
              <motion.h1
                variants={SLIDE_UP_VARIANTS}
                className="text-4xl font-bold text-purple-400"
              >
                Terms & Consent
              </motion.h1>

              <motion.div
                variants={SLIDE_UP_VARIANTS}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-left space-y-4"
              >
                <h3 className="text-xl font-bold text-white">
                  By participating, you agree to:
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✅ Fair play and no cheating</li>
                  <li>✅ Respect other clan members</li>
                  <li>✅ Accept battle outcomes</li>
                  <li>✅ Follow community guidelines</li>
                  <li>✅ Understand this is a competitive game</li>
                </ul>
              </motion.div>

              <motion.label
                variants={SLIDE_UP_VARIANTS}
                className="flex items-center justify-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={userConsent}
                  onChange={(e) => setUserConsent(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-purple-500 bg-transparent"
                />
                <span className="text-white">
                  I agree to the terms and conditions
                </span>
              </motion.label>

              <motion.button
                variants={SCALE_VARIANTS}
                whileHover={{ scale: userConsent ? 1.05 : 1 }}
                whileTap={{ scale: userConsent ? 0.95 : 1 }}
                onClick={() => userConsent && setCurrentView("wallet")}
                disabled={!userConsent}
                className={`px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 ${
                  userConsent
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25"
                    : "bg-gray-600 cursor-not-allowed opacity-50"
                }`}
              >
                CONNECT WALLET
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* 🔗 WALLET CONNECTION */}
        {currentView === "wallet" && (
          <motion.div
            key="wallet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
              className="max-w-lg mx-auto text-center space-y-8"
            >
              <motion.h1
                variants={SLIDE_UP_VARIANTS}
                className="text-4xl font-bold text-purple-400"
              >
                Connect Your Wallet
              </motion.h1>

              <motion.p variants={SLIDE_UP_VARIANTS} className="text-gray-300">
                Connect your Aptos wallet to join the battle arena and start
                earning treasures!
              </motion.p>

              <motion.div variants={SLIDE_UP_VARIANTS} className="space-y-4">
                <button
                  onClick={handleConnectWallet}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  🟣 Connect Petra Wallet
                </button>

                <button
                  onClick={handleConnectWallet}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  🔵 Connect Martian Wallet
                </button>

                <button
                  onClick={handleConnectWallet}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  🟢 Connect Pontem Wallet
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* 🏰 CLAN SELECTION */}
        {currentView === "clans" && (
          <motion.div
            key="clans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 py-8"
          >
            <motion.div
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto"
            >
              <motion.div
                variants={SLIDE_UP_VARIANTS}
                className="text-center mb-12"
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                  CHOOSE YOUR CLAN
                </h1>
                <p className="text-xl text-gray-300">
                  Week {currentWeek} • 100 Clans • 50 Battles • Massive Prizes
                </p>
              </motion.div>

              <motion.div
                variants={SLIDE_UP_VARIANTS}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {clans.map((clan) => (
                  <motion.div
                    key={clan.id}
                    variants={FADE_VARIANTS}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleClanSelect(clan)}
                    className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 cursor-pointer transition-all duration-300"
                  >
                    <div className="text-center space-y-4">
                      <div className="text-4xl">{clan.emoji}</div>
                      <h3 className="text-xl font-bold text-white">
                        {clan.name}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Members:</span>
                          <span className="text-white">{clan.memberCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Power:</span>
                          <span className="text-purple-400">
                            {clan.totalPower}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Battles Won:</span>
                          <span className="text-green-400">
                            {Math.floor(Math.random() * 20)}
                          </span>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-purple-600/20 rounded-lg">
                        <span className="text-purple-300 text-sm">
                          Entry: {starterCardPrice} APT
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* 🏟️ BATTLE ARENA */}
        {currentView === "arena" && selectedClan && (
          <motion.div
            key="arena"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 py-8"
          >
            <motion.div
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto"
            >
              {/* Arena Header */}
              <motion.div
                variants={SLIDE_UP_VARIANTS}
                className="text-center mb-8"
              >
                <h1 className="text-4xl font-bold text-white mb-2">
                  {selectedClan.emoji} {selectedClan.name} Arena
                </h1>
                <p className="text-gray-300">
                  Week {currentWeek} Battle Arena • Rank #
                  {Math.floor(Math.random() * 20) + 1}
                </p>
              </motion.div>

              {/* Arena Navigation */}
              <motion.div
                variants={SLIDE_UP_VARIANTS}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                {(
                  [
                    "trading",
                    "stats",
                    "collection",
                    "treasure",
                    "upgrade",
                  ] as ArenaTab[]
                ).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-6 py-3 rounded-xl font-bold capitalize transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                        : "bg-black/20 text-gray-400 hover:text-white hover:bg-black/40"
                    }`}
                  >
                    {tab === "trading" && "🏪"} {tab === "stats" && "📊"}{" "}
                    {tab === "collection" && "🎯"}
                    {tab === "treasure" && "💰"} {tab === "upgrade" && "⚡"}{" "}
                    {tab}
                  </button>
                ))}
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* 🏪 TRADING TAB */}
                {activeTab === "trading" && (
                  <motion.div
                    key="trading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-purple-400 mb-6">
                      Clan Trading Hub
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockTradingNFTs.map((nft) => (
                        <div
                          key={nft.id}
                          className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                        >
                          <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-4xl">
                              {selectedClan.emoji}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">
                            {nft.name}
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Current Bid:
                              </span>
                              <span className="text-green-400">
                                {nft.currentBid} APT
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Bids:</span>
                              <span className="text-purple-400">
                                {nft.bidCount}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Time Left:</span>
                              <span className="text-amber-400">
                                {formatTimeLeft(nft.timeLeft)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Level:</span>
                              <span className="text-blue-400">{nft.level}</span>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <input
                              type="number"
                              placeholder="Enter bid amount"
                              value={selectedNFT?.id === nft.id ? userBid : ""}
                              onChange={(e) => {
                                setSelectedNFT(nft);
                                setUserBid(e.target.value);
                              }}
                              className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400"
                            />
                            <button
                              onClick={() => handlePlaceBid(nft)}
                              className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                            >
                              Place Bid
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 📊 STATS TAB */}
                {activeTab === "stats" && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-purple-400 mb-6">
                      Clan Performance & Strategy
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Clan Stats */}
                      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                        <h3 className="text-xl font-bold text-white mb-4">
                          📈 Current Stats
                        </h3>
                        <div className="space-y-4">
                          {[
                            {
                              label: "Clan Rank",
                              value: `#${Math.floor(Math.random() * 20) + 1}`,
                              color: "text-amber-400",
                            },
                            {
                              label: "Total Power",
                              value: selectedClan.totalPower.toLocaleString(),
                              color: "text-purple-400",
                            },
                            {
                              label: "Active Members",
                              value: selectedClan.memberCount,
                              color: "text-green-400",
                            },
                            {
                              label: "Battles Won",
                              value: Math.floor(Math.random() * 15) + 5,
                              color: "text-blue-400",
                            },
                            {
                              label: "Weekly Score",
                              value: Math.floor(Math.random() * 5000) + 2000,
                              color: "text-pink-400",
                            },
                          ].map((stat, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center"
                            >
                              <span className="text-gray-400">
                                {stat.label}:
                              </span>
                              <span className={`font-bold ${stat.color}`}>
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strategy Tips */}
                      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                        <h3 className="text-xl font-bold text-white mb-4">
                          💡 Score Boosting Tips
                        </h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-600/10 border border-green-500/20 rounded-lg">
                            <div className="text-green-400 font-semibold">
                              🔥 High Impact
                            </div>
                            <div className="text-sm text-gray-300">
                              Trade rare NFTs to boost clan power by 15-25%
                            </div>
                          </div>
                          <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                            <div className="text-blue-400 font-semibold">
                              ⚡ Medium Impact
                            </div>
                            <div className="text-sm text-gray-300">
                              Upgrade your best NFTs for consistent score gains
                            </div>
                          </div>
                          <div className="p-3 bg-purple-600/10 border border-purple-500/20 rounded-lg">
                            <div className="text-purple-400 font-semibold">
                              💎 Long Term
                            </div>
                            <div className="text-sm text-gray-300">
                              Stake NFTs for daily rewards and loyalty bonuses
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Battle Schedule */}
                    <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                      <h3 className="text-xl font-bold text-white mb-4">
                        ⚔️ Upcoming Battles
                      </h3>
                      <div className="space-y-3">
                        {mockBattles
                          .filter((b) => b.status === "upcoming")
                          .slice(0, 3)
                          .map((battle) => (
                            <div
                              key={battle.id}
                              className="flex items-center justify-between p-3 bg-black/40 rounded-lg"
                            >
                              <div className="flex items-center space-x-4">
                                <span className="text-2xl">
                                  {battle.clan1?.emoji}
                                </span>
                                <span className="text-white font-semibold">
                                  VS
                                </span>
                                <span className="text-2xl">
                                  {battle.clan2?.emoji}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-amber-400 font-semibold">
                                  {battle.prizePool.toLocaleString()} APT
                                </div>
                                <div className="text-gray-400 text-sm">
                                  Week {battle.week}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 🎯 COLLECTION TAB */}
                {activeTab === "collection" && (
                  <motion.div
                    key="collection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-purple-400 mb-6">
                      Your War Collection
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockUserCollection.map((nft) => (
                        <div
                          key={nft.id}
                          className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20"
                        >
                          <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg mb-4 flex items-center justify-center relative">
                            <span className="text-4xl">
                              {selectedClan.emoji}
                            </span>
                            {nft.isStaked && (
                              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                STAKED
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">
                            {nft.name}
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Level:</span>
                              <span className="text-blue-400">{nft.level}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Power:</span>
                              <span className="text-purple-400">
                                {nft.power}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Experience:</span>
                              <span className="text-amber-400">
                                {nft.experience.toLocaleString()}
                              </span>
                            </div>
                            {nft.isStaked && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Daily Reward:
                                </span>
                                <span className="text-green-400">
                                  {nft.dailyReward} APT
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="mt-4">
                            {nft.isStaked ? (
                              <button className="w-full px-4 py-2 bg-gradient-to-r from-green-600/50 to-blue-600/50 rounded-lg font-bold cursor-not-allowed">
                                Earning Rewards
                              </button>
                            ) : (
                              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                                Stake NFT
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 💰 TREASURE TAB */}
                {activeTab === "treasure" && (
                  <motion.div
                    key="treasure"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-purple-400 mb-6">
                      Treasure Vault
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Available Treasures */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">
                          🎁 Available Rewards
                        </h3>
                        {mockTreasures
                          .filter((t) => !t.claimed)
                          .map((treasure) => (
                            <div
                              key={treasure.id}
                              className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-lg font-bold text-white">
                                    {treasure.name}
                                  </h4>
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs ${
                                        treasure.rarity === "legendary"
                                          ? "bg-amber-600/20 text-amber-400"
                                          : treasure.rarity === "epic"
                                          ? "bg-purple-600/20 text-purple-400"
                                          : treasure.rarity === "rare"
                                          ? "bg-blue-600/20 text-blue-400"
                                          : "bg-gray-600/20 text-gray-400"
                                      }`}
                                    >
                                      {treasure.rarity.toUpperCase()}
                                    </span>
                                    <span className="text-green-400 font-bold">
                                      {treasure.value.toLocaleString()} APT
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleClaimTreasure(treasure)}
                                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                                >
                                  Claim
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Claimed History */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">
                          📜 Claimed History
                        </h3>
                        {mockTreasures
                          .filter((t) => t.claimed)
                          .map((treasure) => (
                            <div
                              key={treasure.id}
                              className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-500/20 opacity-60"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-lg font-bold text-gray-300">
                                    {treasure.name}
                                  </h4>
                                  <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                                      {treasure.rarity.toUpperCase()}
                                    </span>
                                    <span className="text-gray-400 font-bold">
                                      {treasure.value.toLocaleString()} APT
                                    </span>
                                  </div>
                                </div>
                                <span className="text-green-400 font-bold">
                                  ✓ CLAIMED
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ⚡ UPGRADE TAB */}
                {activeTab === "upgrade" && (
                  <motion.div
                    key="upgrade"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-purple-400 mb-6">
                      NFT Enhancement Lab
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Select NFT to Upgrade */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                          🔧 Select NFT to Upgrade
                        </h3>
                        <div className="space-y-3">
                          {mockUserCollection.map((nft) => (
                            <div
                              key={nft.id}
                              onClick={() => setUpgradeNFT(nft)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                upgradeNFT?.id === nft.id
                                  ? "bg-purple-600/20 border-purple-500"
                                  : "bg-black/20 border-purple-500/20 hover:border-purple-500/50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-bold text-white">
                                    {nft.name}
                                  </h4>
                                  <div className="text-sm text-gray-400">
                                    Level {nft.level} • Power {nft.power}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-amber-400 font-bold">
                                    {nft.upgradeCost} APT
                                  </div>
                                  <div className="text-gray-400 text-xs">
                                    Upgrade Cost
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Upgrade Preview */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                          ⚡ Upgrade Preview
                        </h3>
                        {upgradeNFT ? (
                          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                            <h4 className="text-lg font-bold text-white mb-4">
                              {upgradeNFT.name}
                            </h4>

                            <div className="space-y-4">
                              <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                                <span className="text-gray-400">Level:</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-blue-400">
                                    {upgradeNFT.level}
                                  </span>
                                  <span className="text-gray-400">→</span>
                                  <span className="text-green-400">
                                    {upgradeNFT.level + 1}
                                  </span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                                <span className="text-gray-400">Power:</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-purple-400">
                                    {upgradeNFT.power}
                                  </span>
                                  <span className="text-gray-400">→</span>
                                  <span className="text-green-400">
                                    {upgradeNFT.power +
                                      Math.floor(upgradeNFT.power * 0.15)}
                                  </span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                                <span className="text-gray-400">
                                  Battle Score:
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-amber-400">
                                    +{Math.floor(upgradeNFT.level * 10)}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleUpgradeNFT(upgradeNFT)}
                              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                            >
                              Upgrade for {upgradeNFT.upgradeCost} APT
                            </button>
                          </div>
                        ) : (
                          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center">
                            <div className="text-gray-400 mb-4">
                              Select an NFT to see upgrade preview
                            </div>
                            <div className="text-2xl">⚡</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
