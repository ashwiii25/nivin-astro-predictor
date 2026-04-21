import { GoogleGenAI, Type } from "@google/genai";
import { ZodiacSign, HoroscopeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function fetchHoroscope(sign: ZodiacSign): Promise<HoroscopeData> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a daily horoscope for the zodiac sign ${sign}. 
      The tone should be sharp, direct, and prophetic, like an advanced AI processing celestial data.
      
      Include these sections as arrays of brief, high-impact predictions (3-4 points each, max 15 words per point):
      - Love and Relationships
      - Finance and Wealth
      - Career and Ambition
      - Health and Wellness
      - Academics and Learning
      - Travel and Adventure
      - Energy and Focus
      
      Also provide:
      - A concise summary statement (max 20 words).
      - A sharp, data-driven prediction about "Possibility of Luck".
      - The overall mood (positive, neutral, or negative).
      
      Avoid flowery prose or complex sentence structures. Focus on "what will happen" and "what to do".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            general: { type: Type.STRING },
            love: { type: Type.ARRAY, items: { type: Type.STRING } },
            finance: { type: Type.ARRAY, items: { type: Type.STRING } },
            career: { type: Type.ARRAY, items: { type: Type.STRING } },
            health: { type: Type.ARRAY, items: { type: Type.STRING } },
            academics: { type: Type.ARRAY, items: { type: Type.STRING } },
            travel: { type: Type.ARRAY, items: { type: Type.STRING } },
            energy: { type: Type.ARRAY, items: { type: Type.STRING } },
            luck: { type: Type.STRING },
            mood: { 
              type: Type.STRING, 
              enum: ["positive", "neutral", "negative"] 
            },
          },
          required: ["general", "love", "finance", "career", "health", "academics", "travel", "energy", "luck", "mood"],
        },
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
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
