import { motion } from "framer-motion";
import { clsx } from "clsx";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "shimmer";
  className?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  variant = "spinner",
  className,
  text,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (variant === "spinner") {
    return (
      <div className={clsx("flex flex-col items-center gap-2", className)}>
        <motion.div
          className={clsx(
            "border-2 border-white/20 border-t-primary rounded-full",
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {text && (
          <motion.p
            className="text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={clsx("flex items-center gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        {text && <span className="ml-2 text-sm text-white/70">{text}</span>}
      </div>
    );
  }

  if (variant === "shimmer") {
    return (
      <div
        className={clsx(
          "loading-shimmer rounded-lg",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return null;
};

export default Loading;
