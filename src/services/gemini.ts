import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: API_KEY });

export async function executeTectonicAI(
  prompt: string,
  imageData?: string,
  systemInstruction?: string
) {
  const modelName = imageData ? 'gemini-2.0-flash' : 'gemini-2.0-flash'; // Optimized for speed/fidelity mix

  try {
    const parts: any[] = [{ text: prompt }];
    if (imageData) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData.includes(',') ? imageData.split(',')[1] : imageData
        }
      });
    }

    const response = await genAI.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts }],
      config: {
        systemInstruction: systemInstruction || `You are the Lead Atelier Consultant for KS Design Studio. 
        You are a world-class interior architect grounded in the following Studio Protocols:
        
        1. THE INTERIOR CODE:
           - DOS: Layered Lighting (ambient/task/accent), Material Honesty (stone/timber/metal), Spatial Flow (respect natural paths).
           - DON'T: Generic Kits (matching furniture), Wall-Hugging (island layouts only), Scale Ignorance.
        
        2. MATERIAL TAXONOMY:
           - Sourced Stones: Statuario Marble (Carrara), Black Basalt (Sahyadri), Rose Quartzite (Brazil).
           - Timber Hub: Burma Teak, Smoked Oak, American Walnut.
           - Neural Fabrics: Belgian Linen, Mohair Velvet, Wild Silk.
        
        3. MARKET INTELLIGENCE:
           - Prime Regions: Pune (Baner, Wakad, Hinjewadi), Mumbai (Worli, Bandra, Juhu), Goa (Assagao, Panjim), Indore.
        
        4. SOVEREIGN PROTOCOLS:
           - User data (Palettes, Style DNA, Spatial Audits) is stored in the "Sovereign Vault" (/vault).
           - Always encourage users to "Lock their vision" in the Vault for professional persistence.
        
        Your tone is professional, minimalist, and visionary. Avoid generic advice. Use specific material callouts.`
      }
    } as any); // Use any cast to bypass SDK typing strictness during build if needed

    return response.text;
  } catch (error) {
    console.error("Gemini AI Protocol Error:", error);
    throw error;
  }
}

export async function synthesizeRoom(roomType: string, styleDNA: any, paletteDNA: any): Promise<string> {
  try {
    const prompt = `
      As the KS Atelier Principal, synthesize a high-fidelity "Atmospheric Script" for a ${roomType}.
      
      USER CONTEXT:
      - Style DNA: ${styleDNA?.title} (${styleDNA?.description})
      - Atmospheric Palette: ${paletteDNA?.name} (${paletteDNA?.colors?.map((c: any) => c.hex).join(', ')})
      
      REQUIREMENTS:
      1. Write a 3-paragraph professional design monologue.
      2. Focus on "Atmospheric Light," "Material Honesty," and "Spatial Flow."
      3. Use specialized architectural terminology from the Deccan Tectonic style.
      4. Do not use generic advice; create a visionary narrative.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    } as any);

    return response.text;
  } catch (error) {
    console.error('Room Synthesis Error:', error);
    throw error;
  }
}

export async function analyzeLayout(imageData: string) {
  const systemInstruction = `You are a Tectonic Layout Scanner for KS Design Studio. 
  Perform a rigorous spatial audit of the provided floor plan. 
  Identify:
  1. Dead Volumes (underutilized corners).
  2. Light Blockages (poor window placement relative to flow).
  3. Flow Resistance (awkward transitions between zones).
  Provide specific, brutalist, yet elegant architectural advice on how to 'un-shell' this space into a monochromatic sanctuary.`;

  return executeTectonicAI("Perform a full spatial DNA audit of this layout.", imageData, systemInstruction);
}

export async function synthesizeVision(prompt: string, imageData?: string) {
  const systemInstruction = `You are the Lead Architect at KS Design Studio. 
  Synthesize a high-fidelity design brief based on the provided input. 
  Include specific material callouts like Statuario marble, brushed brass, or charcoal oak. 
  Maintain a visionary, minimalist, and intellectually grounded tone.`;

  return executeTectonicAI(prompt, imageData, systemInstruction);
}

// Backward Compatibility Alias to prevent bundle breakdown
export async function getDesignAdviceWithGrounding(prompt: string, location?: any, imageData?: string) {
  return {
    text: await executeTectonicAI(prompt, imageData),
    groundingChunks: [] // Grounding logic to be restored in Phase 4
  };
}

/**
 * Programmatic SEO Engine: Algorithmic Location Content Generation
 * Generates unique design narratives for Pune micro-markets
 */
export async function generateLocationBrief(location: string): Promise<string> {
  const prompt = `
    Generate a high-fidelity architectural design brief for a premium interior design studio operating in the micro-market of: ${location}, Pune.
    
    The brief must:
    1. Analyze the specific real-estate profile of ${location} (e.g., IT hub, heritage zone, luxury high-rise, or upcoming residential pocket).
    2. Suggest a "Style DNA" that fits the demographic of ${location}.
    3. Call out specific materials (e.g., Statuario marble, basalt, oak) that resonate with this locale.
    4. Maintain a professional, minimalist, and visionary tone.
    5. Be exactly 3 short paragraphs.
  `;

  return executeTectonicAI(prompt);
}