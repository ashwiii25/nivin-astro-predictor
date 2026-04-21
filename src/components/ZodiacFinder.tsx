import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ZODIAC_SIGNS, ZodiacInfo } from '../types';

interface ZodiacFinderProps {
  onFound: (sign: ZodiacInfo) => void;
}

export const ZodiacFinder = ({ onFound }: ZodiacFinderProps) => {
  const [dob, setDob] = useState('');

  const getZodiacFromDate = (dateStr: string): ZodiacInfo | null => {
    // Manually parse YYYY-MM-DD to avoid timezone shifts from new Date().
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS[0]; // Aries
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS[1]; // Taurus
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS[2]; // Gemini
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS[3]; // Cancer
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS[4]; // Leo
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS[5]; // Virgo
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_SIGNS[6]; // Libra
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_SIGNS[7]; // Scorpio
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS[8]; // Sagittarius
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS[9]; // Capricorn
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS[10]; // Aquarius
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return ZODIAC_SIGNS[11]; // Pisces
    
    return null;
  };

  const handleFind = () => {
    if (!dob) return;
    const sign = getZodiacFromDate(dob);
    if (sign) onFound(sign);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="frosted-glass p-8 md:p-20 max-w-2xl w-full flex flex-col gap-8 md:gap-10 shadow-[0_50px_100px_rgba(0,0,0,0.1)]"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-2">
        <div className="p-4 md:p-6 bg-indigo-50 rounded-2xl md:rounded-3xl border border-indigo-100 shadow-inner">
          <Calendar className="text-celestial-indigo" size={32} />
        </div>
        <h2 className="text-4xl md:text-7xl mag-title text-center md:text-left">Find Your Sign</h2>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        <label className="block text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-400 pl-2">Birth Date In The Stars</label>
        <input 
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-4 md:p-8 text-lg md:text-2xl border-2 md:border-4 border-indigo-50 bg-white/50 rounded-2xl md:rounded-3xl font-serif italic text-slate-700 focus:ring-4 md:focus:ring-8 focus:ring-indigo-500/10 focus:border-indigo-400 outline-none transition-all placeholder:opacity-30"
        />
      </div>

      <button
        onClick={handleFind}
        disabled={!dob}
        className="group relative inline-flex items-center justify-center px-8 md:px-12 py-5 md:py-8 font-bold text-white transition-all duration-300 bg-celestial-indigo rounded-2xl md:rounded-[2.5rem] hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(30,27,75,0.2)]"
      >
        <span className="text-sm md:text-lg uppercase tracking-[0.3em] md:tracking-[0.4em]">Decipher Alignment</span>
        <ArrowRight className="ml-3 md:ml-4 group-hover:translate-x-2 transition-transform" size={20} />
      </button>
    </motion.div>
  );
};
