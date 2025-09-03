import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { Clan } from "../../types";
import { formatNumber, formatCurrency } from "../../utils/format";
import Loading from "../common/Loading";

interface ClanCardProps {
  clan: Clan;
  onJoin?: () => void;
  onView?: () => void;
  isUserClan?: boolean;
  isJoining?: boolean;
  showActions?: boolean;
  className?: string;
}

const ClanCard: React.FC<ClanCardProps> = ({
  clan,
  onJoin,
  onView,
  isUserClan = false,
  isJoining = false,
  showActions = true,
  className,
}) => {
  const getMomentumIcon = (momentum: Clan["momentum"]) => {
    switch (momentum) {
      case "hot":
        return "🔥";
      case "new":
        return "✨";
      case "value":
        return "💎";
      default:
        return "📊";
    }
  };

  const getMomentumColor = (momentum: Clan["momentum"]) => {
    switch (momentum) {
      case "hot":
        return "text-orange-400 bg-orange-400/20";
      case "new":
        return "text-blue-400 bg-blue-400/20";
      case "value":
        return "text-emerald-400 bg-emerald-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  return (
    <motion.div
      className={clsx(
        "group glass-card-hover cursor-pointer",
        "relative overflow-hidden",
        isUserClan && "ring-2 ring-primary/50",
        className
      )}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onView}
    >
      {/* Momentum Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={clsx(
            "px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm flex items-center gap-1",
            getMomentumColor(clan.momentum)
          )}
        >
          <span>{getMomentumIcon(clan.momentum)}</span>
          <span className="uppercase">{clan.momentum}</span>
        </div>
      </div>

      {/* Clan Banner/Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        {clan.bannerUrl ? (
          <img
            src={clan.bannerUrl}
            alt={`${clan.name} banner`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              // Fallback to gradient background
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">{clan.icon}</span>
          </div>
        )}

        {/* Clan Icon Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="w-16 h-16 glass-card flex items-center justify-center text-2xl">
            {clan.icon}
          </div>
        </div>

        {/* User Badge */}
        {isUserClan && (
          <div className="absolute top-4 left-4">
            <div className="bg-primary/80 text-white px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
              YOUR CLAN
            </div>
          </div>
        )}
      </div>

      {/* Clan Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{clan.name}</h3>
            {clan.description && (
              <p className="text-sm text-white/70 line-clamp-2">
                {clan.description}
              </p>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {formatNumber(clan.members)}
            </div>
            <div className="text-xs text-white/70">Members</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {formatNumber(clan.totalTrades24h)}
            </div>
            <div className="text-xs text-white/70">24h Trades</div>
          </div>
        </div>

        {/* Floor Price */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-white/70">Floor Price</span>
          <span className="font-bold text-accent">
            {formatCurrency(clan.floorPrice)}
          </span>
        </div>

        {/* Progress Bar for Activity */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>Activity</span>
            <span>
              {clan.totalTrades24h > 1000
                ? "Very High"
                : clan.totalTrades24h > 500
                ? "High"
                : "Moderate"}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min((clan.totalTrades24h / 2000) * 100, 100)}%`,
              }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            {!isUserClan && onJoin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onJoin();
                }}
                disabled={isJoining}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isJoining ? (
                  <Loading size="sm" variant="spinner" />
                ) : (
                  <>
                    <span>Join Clan</span>
                    <span>⚔️</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onView?.();
              }}
              className="btn-secondary"
            >
              View
            </button>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      {/* Animated Border */}
      <div
        className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 
                      rounded-2xl transition-colors duration-300 pointer-events-none"
      />
    </motion.div>
  );
};

export default ClanCard;
