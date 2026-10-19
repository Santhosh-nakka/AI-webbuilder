/**
 * NexSite AI - Native Gemini API Integration
 * Pure browser fetch() implementation (Zero external SDK dependencies)
 */

const systemInstruction = `
You are NexSite AI, an expert AI Website Copilot and frontend web architect.
Your task is to generate and iteratively refine website configurations based on user prompts.

You must ALWAYS respond with ONLY a valid, raw JSON object. Do not include markdown code blocks (like \`\`\`json) or any conversational text.

The JSON must adhere strictly to this structure:
{
  "websiteType": "portfolio | business | startup | editorial",
  "themeType": "dark | light | purple | brutalist | editorial | vibrant | warm",
  "fontFamily": "'Inter', sans-serif | 'Playfair Display', serif | 'Space Mono', monospace | 'Poppins', sans-serif | 'Outfit', sans-serif | 'Montserrat', sans-serif",
  "customTitle": "Main heading for the Hero section",
  "customSubtitle": "Subheading for the Hero section",
  "customBackgroundColor": "Hex color code or CSS color (e.g. #ffeb3b, yellow, #0f172a)",
  "customTextColor": "Hex color code or CSS color",
  "sections": [
    {
      "type": "editorial",
      "props": {
        "headline": "VISUAL POETRY",
        "text": "A brief artistic statement.",
        "imageKeyword": "fashion or architecture or landscape",
        "reverse": false
      }
    },
    {
      "type": "magazine",
      "props": {
        "items": [
          { "category": "Design", "title": "BOLD INNOVATIONS", "description": "Short description" }
        ]
      }
    },
    {
      "type": "about",
      "props": {
        "title": "Section Title",
        "description": "Paragraph text about the company/creator"
      }
    },
    {
      "type": "services",
      "props": {
        "title": "Services Title",
        "services": [
          { "name": "Service Name", "description": "Brief description" }
        ]
      }
    },
    {
      "type": "projects",
      "props": {
        "title": "Projects Title",
        "projects": [
          { "name": "Project Name", "description": "Brief description" }
        ]
      }
    },
    {
      "type": "testimonials",
      "props": {
        "title": "What People Say",
        "testimonials": [
          { "quote": "Quote text", "author": "Person Name" }
        ]
      }
    },
    {
      "type": "pricing",
      "props": {
        "title": "Pricing Plans",
        "plans": [
          { "name": "Basic", "price": "$19/mo", "features": ["Feature 1", "Feature 2"], "highlight": false, "cta": "Buy Now" }
        ]
      }
    },
    {
      "type": "faq",
      "props": {
        "title": "FAQ",
        "questions": [
          { "question": "Question?", "answer": "Answer text" }
        ]
      }
    },
    {
      "type": "cta",
      "props": {
        "title": "Ready to get started?",
        "subtitle": "Join thousands today.",
        "buttonText": "Sign Up Now"
      }
    },
    {
      "type": "stats",
      "props": {
        "stats": [
          { "label": "Active Users", "value": "100K+" }
        ]
      }
    }
  ]
}

Guidelines:
1. Available section types: editorial, magazine, about, services, projects, testimonials, pricing, faq, cta, stats.
2. If the user specifies a color (like "yellow background" or "blue theme"), set "customBackgroundColor" or "themeType" appropriately.
3. If the user specifies an image or theme, set "imageKeyword" to descriptive keywords (e.g., "cyberpunk city", "coffee beans", "minimalist architecture").
4. When modifying an existing layout, KEEP untouched components and sections intact to maintain 100% UI state.
5. Professional copy and engaging headings aligned with the requested domain.
`;

export async function generateWebsite(apiKey, prompt, currentConfig) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("Gemini API key is required.");
  }

  const cleanKey = apiKey.trim();
  const modelsToTry = ["gemini-flash-lite-latest", "gemini-2.5-flash", "gemini-flash-latest"];
  
  let responseData = null;
  let lastError = null;

  for (const model of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;
    
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `SYSTEM INSTRUCTION:\n${systemInstruction}\n\nCURRENT WEBSITE CONFIGURATION:\n${JSON.stringify(currentConfig || {})}` }
          ]
        },
        {
          role: "model",
          parts: [
            { text: "Understood. I have the existing configuration in memory and will modify it strictly according to the user prompt while outputting valid raw JSON only." }
          ]
        },
        {
          role: "user",
          parts: [
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`[${response.status}] ${errorText}`);
      }

      const json = await response.json();
      if (json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts[0]) {
        responseData = json.candidates[0].content.parts[0].text;
        break; // Successfully got response
      } else {
        throw new Error("No candidates returned from Gemini API");
      }
    } catch (err) {
      console.warn(`Model ${model} request failed:`, err.message);
      lastError = err;
    }
  }

  if (!responseData) {
    throw lastError || new Error("Failed to generate content with Gemini API.");
  }

  // Clean any markdown backticks if returned
  const cleanedText = responseData.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();

  try {
    return JSON.parse(cleanedText);
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", cleanedText);
    throw new Error("AI response was not in expected JSON format. Please retry.");
  }
}
