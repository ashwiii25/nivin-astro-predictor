import React, { useRef, useEffect } from 'react';
import { ZodiacCard } from './ZodiacCard';
import { ZODIAC_SIGNS, ZodiacInfo } from '../types';

interface ZodiacCarouselProps {
  onSelect: (sign: ZodiacInfo) => void;
}

export const ZodiacCarousel = ({ onSelect }: ZodiacCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const posRef = useRef<number>(0);
  const isInteracting = useRef<boolean>(false);

  // Triple signs for a truly infinite feel and seamless loop jumps
  const extendedSigns = [...ZODIAC_SIGNS, ...ZODIAC_SIGNS, ...ZODIAC_SIGNS];

  const animate = () => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const singleSetWidth = scrollWidth / 3;
      
      // Auto-drift (Conveyor flow) - Always moving
      posRef.current += 0.5;
      
      // Infinite loop reset logic on the high-precision value
      if (posRef.current >= singleSetWidth * 2) {
        posRef.current -= singleSetWidth;
      } else if (posRef.current <= 0) {
        posRef.current += singleSetWidth;
      }

      // Sync scrollLeft with precision position
      scrollRef.current.scrollLeft = posRef.current;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  const handleScroll = () => {
    if (scrollRef.current && isInteracting.current) {
      // If the user's scroll position significantly differs from our precision ref,
      // it means they've manually scrolled. We sync our ref to the new anchor.
      const diff = Math.abs(scrollRef.current.scrollLeft - posRef.current);
      if (diff > 1) {
        posRef.current = scrollRef.current.scrollLeft;
      }
    }
  };

  useEffect(() => {
    // Initial setup
    const handleStart = () => {
      if (scrollRef.current) {
        const singleSetWidth = scrollRef.current.scrollWidth / 3;
        posRef.current = singleSetWidth;
        scrollRef.current.scrollLeft = posRef.current;
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(handleStart, 100);

    return () => {
      clearTimeout(timer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="w-full relative py-8 md:py-12 select-none overflow-visible">
      <div 
        ref={scrollRef}
        onMouseEnter={() => { isInteracting.current = true; }}
        onMouseLeave={() => { isInteracting.current = false; }}
        onScroll={handleScroll}
        className="w-full overflow-x-auto overflow-y-visible no-scrollbar flex items-center cursor-grab active:cursor-grabbing overscroll-x-contain flex-nowrap"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="flex gap-6 md:gap-10 px-[10vw] md:px-[20vw] min-w-max pb-8">
          {extendedSigns.map((zodiac, i) => (
            <div key={`${zodiac.name}-${i}`} className="flex-shrink-0">
              <ZodiacCard zodiac={zodiac} onClick={onSelect} index={i % 12} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


