import { GoogleGenAI } from "@google/genai";

// Initialize the SDK.
// For local testing in CodeSandbox, you can swap "YOUR_API_KEY" with an actual key from Google AI Studio.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });

export async function askManifestoAI(userMessage: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: `You are the interactive layout engine and core backend for "Manifesto"—a worker-owned, anti-capitalist video game launcher and digital store. Your tone is direct, premium, gaming-focused, and unapologetically anti-corporate (0% platform cut, permanent user anonymity). You speak like a trusted peer protecting a community space. Keep all replies short (maximum 2-3 sentences) so it fits elegantly inside a compact terminal console view without cluttering the screen.`,
      },
    });

    return (
      response.text?.trim() ||
      "[PEER HOTLINE]: Signal weak. Unable to process uplink loop."
    );
  } catch (error) {
    console.error("AI Studio Handshake Error:", error);
    return "[PEER HOTLINE]: Error establishing a secure cryptographic handshake with the AI node.";
  }
}
