import { motion } from 'motion/react';
import { Heart, Coins, Briefcase, Activity, GraduationCap, Plane, Zap, Clover, Sparkles } from 'lucide-react';
import { ZodiacInfo, HoroscopeData } from '../types';

interface HoroscopeDisplayProps {
  zodiac: ZodiacInfo;
  horoscope: HoroscopeData;
  onReset: () => void;
}

export const HoroscopeDisplay = ({ zodiac, horoscope, onReset }: HoroscopeDisplayProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const sections = [
    { title: 'Love & Relationships', icon: Heart, content: horoscope.love, color: 'text-rose-500', bg: 'bg-rose-50' },
    { title: 'Finance & Wealth', icon: Coins, content: horoscope.finance, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Career & Ambition', icon: Briefcase, content: horoscope.career, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Health & Wellness', icon: Activity, content: horoscope.health, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Academics & Learning', icon: GraduationCap, content: horoscope.academics, color: 'text-violet-500', bg: 'bg-violet-50' },
    { title: 'Travel & Adventure', icon: Plane, content: horoscope.travel, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { title: 'Energy & Focus', icon: Zap, content: horoscope.energy, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto flex flex-col gap-10 md:gap-16 pb-12 md:pb-0 px-4 md:px-6 pt-8 md:pt-12"
    >
      {/* Hero Header */}
      <motion.div variants={item} className="text-center flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 md:w-64 md:h-64 mb-4 md:mb-6 rounded-full overflow-hidden border-4 border-white shadow-2xl"
        >
          <img 
            src={zodiac.icon} 
            alt={zodiac.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative mb-4 md:mb-8">
          <h2 className="text-4xl sm:text-6xl md:text-[7rem] mag-title mb-2 md:mb-3 drop-shadow-sm">{zodiac.name}</h2>
          <p className="text-xs sm:text-sm md:text-xl font-bold text-slate-400 uppercase tracking-[0.4em] md:tracking-[0.8em]">{zodiac.dates}</p>
        </div>
        
        <div className="w-full max-w-3xl p-6 sm:p-10 md:p-12 bg-white frosted-glass border-2 md:border-4 border-white shadow-[0_20px_60px_-15px_rgba(30,27,75,0.06)]">
          <p className="text-lg sm:text-2xl md:text-4xl leading-[1.3] text-slate-900 font-serif italic mb-6 md:mb-10 px-2 md:px-4">
            "{horoscope.general}"
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-8 md:pt-12 border-t border-slate-100">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl">
                <Clover className="text-emerald-500" size={24} />
              </div>
              <div className="text-left">
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-400">Fortune Insight</span>
                <p className="text-base md:text-2xl font-serif text-slate-600 italic">"{horoscope.luck}"</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Prediction Cards */}
      <div className="flex flex-col gap-10 md:gap-16">
        {sections.map((section) => (
          <motion.div 
            key={section.title} 
            variants={item} 
            className="w-full bg-white frosted-glass p-8 sm:p-12 md:p-16 flex flex-col items-center text-center gap-8 md:gap-10 border-white/80 shadow-xl"
          >
            <div className="flex flex-col items-center gap-4 md:gap-6">
               <div className={`p-6 md:p-8 ${section.bg} rounded-3xl md:rounded-[2.5rem] border-2 md:border-4 border-white shadow-lg`}>
                  <section.icon size={32} className={section.color} />
               </div>
               <div className="flex flex-col items-center">
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">Neural Prediction</span>
                 <h3 className="text-xl sm:text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-celestial-indigo">{section.title}</h3>
               </div>
            </div>
            
            <ul className="flex flex-col gap-6 md:gap-10 max-w-3xl">
              {section.content.map((point, i) => (
                <li key={i} className="flex flex-col items-center gap-3 md:gap-4 pb-6 md:pb-8 border-b border-indigo-50 last:border-0 last:pb-0">
                  <span className={`text-xl md:text-3xl ${section.color}`}>✦</span>
                  <p className="text-xl sm:text-4xl md:text-6xl text-slate-900 leading-[1.1] font-serif italic px-2 tracking-tight">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Massive Reset Cta */}
      <motion.div variants={item} className="flex flex-col items-center pt-8 md:pt-16">
         <div className="w-full max-w-4xl bg-celestial-indigo p-10 sm:p-16 md:p-24 rounded-[3rem] md:rounded-[4rem] text-center shadow-2xl">
           <Sparkles className="text-indigo-300/40 mx-auto mb-6 md:mb-10 w-12 md:w-20 h-12 md:h-20" />
           <p className="text-lg sm:text-2xl md:text-4xl italic text-indigo-50 font-serif mb-8 md:mb-12 leading-loose px-4 md:px-6">
             "The universe only speaks once a day. Let these words guide your steps until the next alignment."
           </p>
           <button 
             onClick={onReset}
             className="btn-primary bg-white text-celestial-indigo hover:text-white px-10 md:px-16 py-4 md:py-8 text-lg"
           >
             Reset Soul Path
           </button>
         </div>
      </motion.div>
    </motion.div>
  );
};

