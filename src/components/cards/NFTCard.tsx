import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { NFT } from "../../types";
import { formatTimeAgo } from "../../utils/format";

interface NFTCardProps {
  nft: NFT;
  onStake?: () => void;
  onUnstake?: () => void;
  onView?: () => void;
  showActions?: boolean;
  className?: string;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  onStake,
  onUnstake,
  onView,
  showActions = true,
  className,
}) => {
  const getRarityColor = (rarity: NFT["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "from-gold/20 to-yellow-400/20 border-gold/50";
      case "epic":
        return "from-purple-500/20 to-pink-500/20 border-purple-400/50";
      case "rare":
        return "from-blue-500/20 to-cyan-500/20 border-blue-400/50";
      default:
        return "from-gray-500/20 to-gray-400/20 border-gray-400/50";
    }
  };

  const getRarityGlow = (rarity: NFT["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "shadow-[0_0_20px_rgba(251,191,36,0.3)]";
      case "epic":
        return "shadow-[0_0_20px_rgba(168,85,247,0.3)]";
      case "rare":
        return "shadow-[0_0_20px_rgba(59,130,246,0.3)]";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className={clsx(
        "group relative glass-card overflow-hidden",
        "hover:scale-105 transition-all duration-300",
        getRarityGlow(nft.rarity),
        className
      )}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Rarity Border */}
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-br opacity-50",
          getRarityColor(nft.rarity)
        )}
      />

      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        {nft.imageUrl ? (
          <img
            src={nft.imageUrl}
            alt={nft.name || `NFT #${nft.tokenId}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder
              e.currentTarget.src = `https://via.placeholder.com/300x300/1a0033/9333ea?text=${nft.rarity.toUpperCase()}`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/70">
              #{nft.tokenId}
            </span>
          </div>
        )}

        {/* Staked Overlay */}
        {nft.staked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="glass-card px-3 py-1">
              <span className="text-sm font-bold text-success">🔒 STAKED</span>
            </div>
          </div>
        )}

        {/* Rarity Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={clsx(
              "px-2 py-1 rounded-lg text-xs font-bold uppercase backdrop-blur-sm",
              nft.rarity === "legendary" && "bg-gold/80 text-black",
              nft.rarity === "epic" && "bg-purple-500/80 text-white",
              nft.rarity === "rare" && "bg-blue-500/80 text-white",
              nft.rarity === "common" && "bg-gray-500/80 text-white"
            )}
          >
            {nft.rarity}
          </span>
        </div>
      </div>

      {/* NFT Info */}
      <div className="relative p-4">
        <h3 className="font-bold text-white mb-1 truncate">
          {nft.name || `NFT #${nft.tokenId}`}
        </h3>

        <div className="flex items-center justify-between text-sm text-white/70 mb-3">
          <span>Token #{nft.tokenId}</span>
          {nft.mintedAt && (
            <span>{formatTimeAgo(new Date(nft.mintedAt).getTime())}</span>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            {nft.staked ? (
              <button
                onClick={onUnstake}
                className="flex-1 bg-accent/20 text-accent hover:bg-accent/30 
                          font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
              >
                Unstake
              </button>
            ) : (
              <button
                onClick={onStake}
                className="flex-1 bg-success/20 text-success hover:bg-success/30 
                          font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
              >
                Stake
              </button>
            )}

            {onView && (
              <button
                onClick={onView}
                className="bg-white/10 text-white hover:bg-white/20 
                          font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
              >
                View
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
    </motion.div>
  );
};

export default NFTCard;
