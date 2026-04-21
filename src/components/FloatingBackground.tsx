import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Star, Moon, Sparkles, Sun, Cloud, Eye, Hexagon } from 'lucide-react';

interface FloatingIconProps {
  delay: number;
  duration: number;
  size: number;
  left: string;
  top: string;
  mood: 'positive' | 'neutral' | 'negative';
  Icon: React.ElementType;
}

const FloatingIcon = ({ Icon, delay, duration, size, left, top, mood }: FloatingIconProps) => {
  const speedScale = mood === 'positive' ? 0.7 : mood === 'negative' ? 2 : 1;
  const opacity = mood === 'negative' ? 0.08 : 0.15;
  const glow = mood === 'positive' ? 'drop-shadow(0 0 15px rgba(255,180,100,0.5))' : 'none';

  return (
    <motion.div
      className="absolute pointer-events-none text-indigo-900"
      style={{ left, top, opacity }}
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [0, -60, 0],
        rotate: [0, 360],
        scale: mood === 'positive' ? [1, 1.2, 1] : 1
      }}
      transition={{ 
        duration: duration * speedScale, 
        repeat: Infinity, 
        delay, 
        ease: "easeInOut" 
      }}
    >
      <Icon size={size} style={{ filter: glow }} />
    </motion.div>
  );
};

export const FloatingBackground = ({ mood = 'neutral' }: { mood?: 'positive' | 'neutral' | 'negative' }) => {
  const icons = useMemo(() => {
    const iconTypes = [Star, Moon, Sparkles, Sun, Cloud, Eye, Hexagon];
    return Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      Icon: iconTypes[i % iconTypes.length],
      size: Math.random() * 25 + 15,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-cosmic-bg shadow-[inset_0_0_200px_rgba(30,27,75,0.03)]" />
      {icons.map((icon) => (
        <FloatingIcon key={icon.id} {...icon} mood={mood} />
      ))}
    </div>
  );
};
