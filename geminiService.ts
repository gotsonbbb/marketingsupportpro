
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingPlan } from './types';

// Fixed: Initializing GoogleGenAI right before the call to ensure the latest API key is used.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingContent = async (input: { 
  link?: string; 
  image?: { data: string; mimeType: string };
  price?: string;
  phone?: string;
}): Promise<MarketingPlan & { sources?: string[] }> => {
  const ai = getAI();
  const prompt = `
    Acts as a world-class Myanmar E-commerce Marketing Specialist. 
    Analyze ${input.link ? `this product link: ${input.link}` : 'this product image'}.
    
    Product Details:
    - Target Market: Myanmar (Facebook/TikTok users)
    - Selling Price: ${input.price || 'Market Competitive Price'}
    - Contact: ${input.phone || 'DM for order'}

    OUTPUT FORMAT: JSON (Myanmar Language)
    
    1. productName: Create a catchy brand name or product title.
    2. postCaption: Write a HIGH-CONVERTING Facebook post in Burmese.
       - Use a 'Hook' that stops the scroll.
       - Use 'Bullet points' for benefits.
       - Use modern online shopping slangs (e.g., "ရှယ်ပဲ", "အရည်အသွေးအာမခံ", "လက်မနှေးနဲ့ဦး").
       - Include Price and Phone clearly.
    3. hashtags: 5 trending Myanmar hashtags.
    4. postingTimeSuggestion: Best time to post this on FB for maximum engagement.
    5. strategyAdvice: 3 short, actionable tips to sell this fast.
    6. videoScript: A 15-second TikTok script (Burmese) to demo the product.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { 
        parts: [
          { text: prompt },
          ...(input.image ? [{ inlineData: { data: input.image.data, mimeType: input.image.mimeType } }] : [])
        ] 
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            postCaption: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            postingTimeSuggestion: { type: Type.STRING },
            strategyAdvice: { type: Type.STRING },
            videoScript: { type: Type.STRING }
          },
          required: ["productName", "postCaption", "hashtags", "postingTimeSuggestion", "strategyAdvice", "videoScript"]
        },
        tools: input.link ? [{ googleSearch: {} }] : []
      }
    });

    // Fixed: Search Grounding may result in non-JSON text output. Extracting JSON block safely before parsing.
    let responseText = response.text || '{}';
    if (!responseText.trim().startsWith('{')) {
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) responseText = match[0];
    }
    const plan = JSON.parse(responseText);
    
    const sources: string[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri) sources.push(chunk.web.uri);
      });
    }

    return { ...plan, sources };
  } catch (error) {
    console.error("Content Generation Error:", error);
    throw error;
  }
};

export const generateProductVisual = async (productName: string, sourceImage?: { data: string, mimeType: string }): Promise<string> => {
  const ai = getAI();
  const studioPrompt = sourceImage 
    ? `Professional studio photography of the product "${productName}" from the provided image. High resolution, clean minimalist background, cinematic lighting, 8k.`
    : `High-end commercial advertisement photo for "${productName}". Professional studio setup, luxury feel, white/grey background, crisp details.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { 
      parts: [
        ...(sourceImage ? [{ inlineData: { data: sourceImage.data, mimeType: sourceImage.mimeType } }] : []),
        { text: studioPrompt }
      ] 
    }
  });
  
  // Fixed: Iterating through parts to find the image part specifically, as output may contain multiple parts.
  const imgPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (imgPart?.inlineData) return `data:image/png;base64,${imgPart.inlineData.data}`;
  throw new Error("Visual generation failed.");
};

export const generateLogo = async (brandName: string, style: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { 
      parts: [{ 
        text: `Minimalist professional business logo for '${brandName}'. Style: ${style}. Vector art, flat design, white background, high quality.` 
      }] 
    }
  });
  // Fixed: Correctly extracting base64 image data from the specific response part containing inlineData.
  const imgPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (imgPart?.inlineData) return `data:image/png;base64,${imgPart.inlineData.data}`;
  throw new Error("Logo generation failed.");
};
