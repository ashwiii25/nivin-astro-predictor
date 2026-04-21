import React from 'react';
import { motion } from 'motion/react';
import { ZodiacInfo } from '../types';

interface ZodiacCardProps {
  zodiac: ZodiacInfo;
  onClick: (sign: ZodiacInfo) => void;
  index: number;
}

export const ZodiacCard: React.FC<ZodiacCardProps> = ({ zodiac, onClick, index }) => {
  return (
    <motion.button
      onClick={() => onClick(zodiac)}
      initial={{ opacity: 0, y: 20, rotate: (Math.random() - 0.5) * 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        rotate: 0,
        zIndex: 10,
        scale: 1.15,
        y: -15,
        boxShadow: "0 40px 60px -15px rgba(0, 0, 0, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className="sticker-photo p-3 md:p-5 min-w-[140px] sm:min-w-[160px] md:min-w-[190px] h-[140px] sm:h-[160px] md:h-[200px] flex flex-col items-center justify-center gap-0.5 bg-white cursor-pointer group origin-bottom"
    >
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden mb-3 rounded-lg border border-slate-100/50 shadow-inner">
        <img 
          src={zodiac.icon} 
          alt={zodiac.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="text-center">
        <h3 className="font-bold uppercase tracking-[0.25em] text-[9px] md:text-[11px] text-celestial-indigo mb-1">{zodiac.name}</h3>
        <p className="text-[8px] md:text-[9px] opacity-40 font-bold uppercase tracking-widest">{zodiac.dates}</p>
      </div>
    </motion.button>
  );
};
