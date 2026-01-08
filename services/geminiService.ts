
import { GoogleGenAI } from "@google/genai";

// Updated to follow @google/genai guidelines: direct process.env.API_KEY access and multi-turn content formatting
export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  // Always use a named parameter and direct environment variable access as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `You are a world-class DevOps Engineer and mentor. 
  Your goal is to help users learn DevOps concepts, troubleshooting server deployments, 
  cloud infrastructure (AWS, Azure, GCP), CI/CD pipelines, Docker, Kubernetes, and Linux.
  Provide clear, technical yet accessible explanations with code examples where relevant.
  Format your responses in clean Markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        // Convert internal history format to the format expected by the GenAI SDK
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Access the response text property directly (it's a getter, not a method)
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered an error while processing your request. Please check your connection and try again.";
  }
};
