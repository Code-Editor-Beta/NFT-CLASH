// Animation and interaction utilities

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  crawl: 1.0
} as const;

export const SPRING_CONFIG = {
  default: { type: "spring", stiffness: 300, damping: 25 },
  gentle: { type: "spring", stiffness: 200, damping: 30 },
  wobbly: { type: "spring", stiffness: 180, damping: 12 },
  stiff: { type: "spring", stiffness: 400, damping: 40 }
} as const;

export const FADE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const SLIDE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const SLIDE_IN_VARIANTS = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const SCALE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export const FLOAT_VARIANTS = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const GLOW_VARIANTS = {
  initial: { 
    boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" 
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(147, 51, 234, 0.3)",
      "0 0 40px rgba(236, 72, 153, 0.5)",
      "0 0 20px rgba(147, 51, 234, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const STAGGER_CONTAINER = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Number count-up animation
export const animateCountUp = (
  start: number,
  end: number,
  duration: number = 1000,
  callback: (value: number) => void
): void => {
  const startTime = performance.now();
  const difference = end - start;

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (difference * easeOut);
    
    callback(Math.floor(currentValue));
    
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      callback(end); // Ensure we end with the exact final value
    }
  };
  
  requestAnimationFrame(step);
};

// Utility to create a staggered animation delay
export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return baseDelay * index;
};

// Confetti animation trigger
export const triggerConfetti = (): void => {
  console.log('🎉 Triggering confetti animation!');
  // This would integrate with a confetti library in a real app
  // For now, we'll just log it
};

// Haptic feedback (for mobile)
export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light'): void => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [50],
      medium: [100],
      heavy: [200]
    };
    navigator.vibrate(patterns[type]);
  }
};

// Sound effects (placeholder)
export const playSound = (soundName: string): void => {
  console.log(`🔊 Playing sound: ${soundName}`);
  // This would integrate with a sound library in a real app
};

// Utility to create a typing animation effect
export const createTypingAnimation = (
  text: string,
  callback: (current: string) => void,
  speed: number = 50
): void => {
  let currentIndex = 0;
  
  const type = () => {
    if (currentIndex <= text.length) {
      callback(text.slice(0, currentIndex));
      currentIndex++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Smooth scroll to element
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Copy to clipboard with animation feedback
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    triggerHaptic('light');
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
