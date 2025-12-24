
import { GoogleGenAI, Type } from "@google/genai";
import { DailyReflection } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getDailyReflection = async (date: Date): Promise<DailyReflection> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const dateStr = date.toLocaleDateString('pt-BR');
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere uma reflexão católica espiritual curta para o dia ${dateStr} para os fiéis da Paróquia Nossa Senhora da Conceição de Virgínia, Minas Gerais. 
      Identifique o santo do dia, a cor litúrgica correta (Verde, Vermelho, Branco, Roxo, Rosa, Preto ou Amarelo para solenidades) e o Tempo Litúrgico detalhado (Ex: "4ª Semana do Advento", "Tempo do Natal", "Oitava de Natal", etc).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verse: { type: Type.STRING, description: "Um versículo bíblico curto" },
            reflection: { type: Type.STRING, description: "Uma reflexão curta de 2-3 frases" },
            saintOfDay: { type: Type.STRING, description: "Nome do santo ou festividade do dia" },
            liturgicalColor: { 
              type: Type.STRING, 
              enum: ["Verde", "Vermelho", "Branco", "Roxo", "Rosa", "Preto", "Amarelo"],
              description: "A cor litúrgica do dia" 
            },
            liturgicalSeason: { type: Type.STRING, description: "Tempo litúrgico e semana atual" }
          },
          required: ["verse", "reflection", "saintOfDay", "liturgicalColor", "liturgicalSeason"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return {
      verse: "O Senhor é meu pastor, nada me faltará.",
      reflection: "Que o amor de Nossa Senhora da Conceição ilumine o seu dia em Virgínia-MG.",
      saintOfDay: "Nossa Senhora",
      liturgicalColor: "Branco",
      liturgicalSeason: "Tempo Comum"
    };
  }
};
