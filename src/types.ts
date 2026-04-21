
export type ZodiacSign = 
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' 
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' 
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface HoroscopeData {
  general: string;
  love: string[];
  finance: string[];
  career: string[];
  health: string[];
  academics: string[];
  travel: string[];
  energy: string[];
  luck: string;
  mood: 'positive' | 'neutral' | 'negative';
}

export interface ZodiacInfo {
  name: ZodiacSign;
  dates: string;
  symbol: string;
  element: string;
  icon: string;
}

export const ZODIAC_SIGNS: ZodiacInfo[] = [
  { name: 'Aries', dates: 'Mar 21 - Apr 19', symbol: '♈', element: 'Fire', icon: '/images/1_arzSqKw1GELTXQNPdTXTzg.jpg' },
  { name: 'Taurus', dates: 'Apr 20 - May 20', symbol: '♉', element: 'Earth', icon: '/images/c9e7519fbdc75b76920f8d79f400f1dc.jpg' },
  { name: 'Gemini', dates: 'May 21 - Jun 20', symbol: '♊', element: 'Air', icon: '/images/gallery3.jpg' },
  { name: 'Cancer', dates: 'Jun 21 - Jul 22', symbol: '♋', element: 'Water', icon: '/images/gallery4.jpg' },
  { name: 'Leo', dates: 'Jul 23 - Aug 22', symbol: '♌', element: 'Fire', icon: '/images/gallery5.jpg' },
  { name: 'Virgo', dates: 'Aug 23 - Sep 22', symbol: '♍', element: 'Earth', icon: '/images/gallery6.jpg' },
  { name: 'Libra', dates: 'Sep 23 - Oct 22', symbol: '♎', element: 'Air', icon: '/images/images (1).jpg' },
  { name: 'Scorpio', dates: 'Oct 23 - Nov 21', symbol: '♏', element: 'Water', icon: '/images/images (2).jpg' },
  { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', symbol: '♐', element: 'Fire', icon: '/images/images.jpg' },
  { name: 'Capricorn', dates: 'Dec 22 - Jan 19', symbol: '♑', element: 'Earth', icon: '/images/maxresdefault.jpg' },
  { name: 'Aquarius', dates: 'Jan 20 - Feb 18', symbol: '♒', element: 'Air', icon: '/images/MV5BMjM0ZGViZWYtOTljMS00NTIzLTgxMTAtM2FhYzI0MzgyNmQ5XkEyXkFqcGc@._V1_.jpg' },
  { name: 'Pisces', dates: 'Feb 19 - Mar 20', symbol: '♓', element: 'Water', icon: '/images/nivinpaulyinnjandukaludenaattiloridavela-07-1502097071.jpg' },
];
