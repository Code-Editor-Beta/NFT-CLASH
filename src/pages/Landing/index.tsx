import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Landing: React.FC = () => {
  console.log("🏠 Landing component rendering...");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClans: 0,
    dailyTrades: 0,
  });

  // Animate stats on mount
  useEffect(() => {
    setTimeout(() => setStats((prev) => ({ ...prev, totalUsers: 15847 })), 500);
    setTimeout(() => setStats((prev) => ({ ...prev, totalClans: 12 })), 1000);
    setTimeout(
      () => setStats((prev) => ({ ...prev, dailyTrades: 3456 })),
      1500
    );
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="text-center px-6 max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-gradient">NFT CLAN</span>
            <br />
            <span className="text-white">VAULTS</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-8 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Pick a clan. Stake your NFTs. Play the meta.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl px-12 py-4 
                       rounded-2xl font-black uppercase tracking-wider hover:scale-105 
                       transition-transform duration-200 shadow-lg hover:shadow-purple-500/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ENTER ARENA ⚔️
          </motion.button>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">
                {stats.totalUsers.toLocaleString()}
              </div>
              <div className="text-white/70 uppercase tracking-wider font-semibold">
                Warriors
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-pink-400 mb-2">
                {stats.totalClans}
              </div>
              <div className="text-white/70 uppercase tracking-wider font-semibold">
                Clans
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-green-400 mb-2">
                {stats.dailyTrades.toLocaleString()}
              </div>
              <div className="text-white/70 uppercase tracking-wider font-semibold">
                24h Trades
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white/50 text-center">
            <div className="text-sm mb-2">Scroll to explore</div>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto relative">
              <motion.div
                className="w-1 h-3 bg-white/50 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Live Activity Feed Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-4">
              🔥 LIVE ARENA ACTIVITY
            </h2>
            <p className="text-white/70 text-lg">
              See what's happening in real-time across all clans
            </p>
          </motion.div>

          {/* Mock Activity Feed */}
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-3">
              {[
                {
                  user: "DragonSlayer",
                  action: "minted 3 NFTs",
                  time: "2m ago",
                  icon: "🎨",
                },
                {
                  user: "NeonNinja",
                  action: "staked 5 NFTs",
                  time: "5m ago",
                  icon: "🔒",
                },
                {
                  user: "CyberWarrior",
                  action: "traded for 12.5 APT",
                  time: "8m ago",
                  icon: "💰",
                },
                {
                  user: "PixelMage",
                  action: "joined Cosmic Cats",
                  time: "12m ago",
                  icon: "⭐",
                },
                {
                  user: "VoidHunter",
                  action: "unstaked 2 NFTs",
                  time: "15m ago",
                  icon: "🔓",
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{activity.icon}</span>
                    <div>
                      <div className="text-white font-semibold">
                        <span className="text-purple-400">{activity.user}</span>{" "}
                        {activity.action}
                      </div>
                      <div className="text-white/50 text-sm">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black text-white mb-4">
              🚀 JOIN THE BATTLE
            </h3>
            <p className="text-white/70 mb-8">
              Enter your warrior name to begin your journey
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl
                         text-white placeholder-white/50 focus:outline-none focus:border-purple-400
                         focus:ring-2 focus:ring-purple-400/20"
              />

              <button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                               px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform duration-200"
              >
                Connect Wallet ⚡
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
