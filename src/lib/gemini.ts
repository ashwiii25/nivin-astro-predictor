import { ZodiacSign, HoroscopeData } from "../types";

export async function fetchHoroscope(sign: ZodiacSign): Promise<HoroscopeData> {
  try {
    const response = await fetch('/api/horoscope', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sign }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data as HoroscopeData;
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return {
      general: "Data alignment confirms high-potential transformation phase. Major shift incoming.",
      love: ["Focus on direct communication.", "A significant connection manifests locally.", "Trust the internal radar."],
      finance: ["Conserve capital immediately.", "New revenue stream detected in periphery.", "High-value asset opportunity approach."],
      career: ["Visible output exceeds expectations.", "Leadership invitation within 72 hours.", "Strategic pivot required for growth."],
      health: ["Prioritize neurological rest.", "Hydration levels are sub-optimal.", "Peak physical performance window opening."],
      academics: ["Critical breakthrough in research path.", "Mental processing speed is at zenith.", "Apply logic to abstract problems."],
      travel: ["Short-range movement yields high Intel.", "Logistics favor spontaneous departures.", "Directional shifts ensure safety."],
      energy: ["Surging focus in early hours.", "High-intensity output cycle starts now.", "Grounding required post-exertion."],
      luck: "Probability of unexpected found value: 94%.",
      mood: 'positive'
    };
  }
}
