import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/extract-startup", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract startup information from the following text and return it in the specified JSON format:
      ${text}
      
      Fields: name, description, industry, stage (ideation, mvp, growth, scaling), businessModel, keyNeeds (array of strings).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            industry: { type: Type.STRING },
            stage: { type: Type.STRING },
            businessModel: { type: Type.STRING },
            keyNeeds: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["name", "industry", "stage"]
        }
      }
    });

    res.json(JSON.parse(response.text));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/match", async (req, res) => {
  try {
    const { startup, mentor } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Match this startup with this mentor.
      Startup: ${JSON.stringify(startup)}
      Mentor: ${JSON.stringify(mentor)}
      
      Return a match score (0-100) and a concise explanation (reasoning).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["score", "reasoning"]
        }
      }
    });

    res.json(JSON.parse(response.text));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ecosystem-learning", async (req, res) => {
  try {
    const { outcomes } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these mentorship outcomes and provide ecosystem-level insights.
      Outcomes: ${JSON.stringify(outcomes)}
      
      Identify trends, success factors, and predict which mentor-startup pairs will likely succeed in the next cycle.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            trends: { type: Type.ARRAY, items: { type: Type.STRING } },
            successFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
            predictedSuccessPairs: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: { 
                  industry: { type: Type.STRING }, 
                  mentorType: { type: Type.STRING } 
                } 
              } 
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware for development
async function startServer() {
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
