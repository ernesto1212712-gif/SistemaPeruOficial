import { GoogleGenAI } from "@google/genai";
import { Product, Category } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeProductImage(base64Image: string): Promise<Partial<Product>> {
  try {
    const model = 'gemini-2.5-flash';
    
    // Clean base64 string if it has the header
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const prompt = `
      Actúa como un experto en marketing digital y ventas de servicios de hacking ético, proxies, configuraciones y métodos.
      Analiza esta imagen y genera los detalles para vender este producto en una tienda online.
      
      Devuelve SOLO un objeto JSON (sin markdown) con esta estructura exacta:
      {
        "title": "Un título corto, potente y atractivo (max 5 palabras)",
        "description": "Una descripción persuasiva, profesional y bien formateada para vender el servicio. Usa saltos de línea \\n para separar párrafos.",
        "price": "Un precio estimado en formato '$XX.00' o 'S/XXX'",
        "category": "Una de estas opciones exactas: 'CONFIGS', 'PROXIES', 'METHODS', 'TOOLS'",
        "features": ["Característica clave 1", "Característica clave 2", "Característica clave 3"]
      }

      Si la imagen es de dinero o transferencias, asume que es un servicio de "Cash Out" o "Método".
      Si la imagen es de código, asume "Config".
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);

  } catch (error) {
    console.error("Error analyzing image:", error);
    return {
      title: 'Nuevo Producto',
      description: 'Descripción generada automáticamente no disponible.',
      features: ['Alta Calidad', 'Garantizado']
    };
  }
}