import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingBackground } from './components/FloatingBackground';
import { ZodiacCarousel } from './components/ZodiacCarousel';
import { HoroscopeDisplay } from './components/HoroscopeDisplay';
import { ZodiacFinder } from './components/ZodiacFinder';
import { ZodiacInfo, HoroscopeData } from './types';
import { fetchHoroscope } from './lib/gemini';
import { Sparkles } from 'lucide-react';

type Page = 'landing' | 'finder' | 'result';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacInfo | null>(null);
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const NIVIN_DIALOGUES = [
    "Java is not a simple cup of tea.",
    "Shambho Mahadeva!",
    "Aa thattam onnu maatti pidicho... njan onnu kanda koodi.",
    "Njan oru sadharanakkarana... oru pavam.",
    "Ente ponnu Aliya... ithu oru mass entry aanu!",
    "Nee aara... George? Njan... Malar.",
    "Kochi pazhaya Kochiyalla, pakshe Nivin pazhaya Nivin thanne!",
    "Style is important... but performance is everything.",
    "Premam oru feel aanu aliyaa...",
    "Nammalil oruthan... Action Hero Biju.",
    "Oru chaya kudippikkan ulla manasundallo... athu mathi.",
    "Sarvashakthanaaya Daivame... njan ippo pottum!",
    "Nee ethra valiya pulliyaanelum... ente munpil thala kunikanam.",
    "Physics... athu oru prathyeka prathibhasama!"
  ];

  const handleSelectZodiac = async (zodiac: ZodiacInfo) => {
    setLoadingText(NIVIN_DIALOGUES[Math.floor(Math.random() * NIVIN_DIALOGUES.length)]);
    setSelectedZodiac(zodiac);
    setLoading(true);
    setPage('result');
    
    try {
      const data = await fetchHoroscope(zodiac.name);
      setHoroscope(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPage('landing');
    setSelectedZodiac(null);
    setHoroscope(null);
  };

  return (
    <div className={`relative w-full flex flex-col bg-cosmic-bg selection:bg-yellow-200 ${page === 'landing' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'}`}>
      <FloatingBackground mood={horoscope?.mood || 'neutral'} />

      <main className="relative z-10 w-full flex-1 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {page === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center gap-12 md:gap-24 pt-12 md:pt-8 pb-8 md:pb-4 overflow-hidden"
            >
              {/* Top Section: Split Layout */}
              <div className="w-full max-w-7xl px-6 md:px-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-10 md:gap-12">
                {/* Left Side: Title & Date */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
                  <motion.h1 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-[9.5rem] mag-title leading-[0.8] mb-6 md:mb-8"
                  >
                    Written in <br className="hidden md:block" /> Your <span className="text-indigo-400">Stars</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 font-bold tracking-[0.5em] md:tracking-[0.6em] uppercase text-[10px] md:text-sm"
                  >
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </motion.p>
                </div>

                {/* Right Side: Image & Button */}
                <div className="flex flex-col items-center md:items-end gap-6 md:gap-8 flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative px-2"
                  >
                    <div className="sticker-photo p-3 md:p-4 bg-white rotate-3 md:rotate-6 hover:rotate-0 transition-transform duration-500">
                      <img 
                        src="/images/main.jpg" 
                        alt="Cosmic Energy" 
                        referrerPolicy="no-referrer"
                        className="w-40 sm:w-48 md:w-80 aspect-[4/3] object-cover grayscale-0 hover:scale-105 transition-all duration-700" 
                      />
                    </div>
                  </motion.div>

                  <motion.button 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => setPage('finder')}
                    className="btn-primary transform hover:scale-105 active:scale-95 py-3 md:py-3.5 px-10 md:px-14 text-[10px] md:text-xs shadow-2xl"
                  >
                    Find My Zodiac
                  </motion.button>
                </div>
              </div>

              {/* Bottom Section: Carousel (Pushed Down) */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full select-none"
              >
                <div className="w-full">
                  <ZodiacCarousel onSelect={handleSelectZodiac} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {page === 'finder' && (
            <motion.div 
              key="finder"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center w-full py-24 px-6 max-w-4xl mx-auto"
            >
              <ZodiacFinder onFound={handleSelectZodiac} />
              <button 
                onClick={() => setPage('landing')}
                className="mt-8 md:mt-12 text-slate-400 font-bold uppercase tracking-[0.2em] md:tracking-widest hover:text-celestial-indigo hover:translate-x-[-10px] transition-all flex items-center gap-2 md:gap-4 text-[10px] md:text-sm"
              >
                <span>←</span> Back to carousel
              </button>
            </motion.div>
          )}

          {page === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="flex flex-col items-center w-full"
            >
              {loading ? (
                <div className="flex flex-col items-center gap-12 py-64">
                  <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.4, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-9xl"
                  >
                    ✦
                  </motion.div>
                  <p className="font-serif text-3xl md:text-5xl font-bold italic tracking-wider animate-pulse text-celestial-indigo text-center px-6 max-w-4xl">
                    "{loadingText}"
                  </p>
                </div>
              ) : (
                selectedZodiac && horoscope && (
                  <HoroscopeDisplay 
                    zodiac={selectedZodiac} 
                    horoscope={horoscope} 
                    onReset={reset}
                  />
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {page !== 'landing' && (
        <footer className="w-full pt-10 md:pt-20 pb-8 md:pb-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] z-10 border-t border-slate-100 bg-white/50 backdrop-blur-sm gap-6 md:gap-0">
          <span>© {new Date().getFullYear()} CELESTIAL QUIRK AI</span>
          <div className="flex gap-8 md:gap-12">
            <a href="#" className="hover:text-indigo-500 transition-colors underline decoration-indigo-100 underline-offset-4">Privacy</a>
            <a href="#" className="hover:text-indigo-500 transition-colors underline decoration-indigo-100 underline-offset-4">Terms</a>
            <a href="#" className="hover:text-indigo-500 transition-colors underline decoration-indigo-100 underline-offset-4">Support</a>
          </div>
        </footer>
      )}
    </div>
  );
}

