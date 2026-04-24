import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from "@google/genai";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Proxy
  app.post('/api/horoscope', async (req, res) => {
    try {
      const { sign } = req.body;
      if (!sign) {
        return res.status(400).json({ error: 'Sign is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
      }

      const ai = new GoogleGenAI({ apiKey });
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
      res.json(data);
    } catch (error) {
      console.error("Error in /api/horoscope:", error);
      res.status(500).json({ error: 'Failed to generate horoscope' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
