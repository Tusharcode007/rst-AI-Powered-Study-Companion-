const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

const callGemini = async (systemInstruction, userPrompt) => {
  const apiKey = localStorage.getItem('geminiApiKey');
  if (!apiKey) throw new Error("API Key configuration is deeply missing! Please securely save your Gemini key natively in the top configuration node.");

  const payload = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: {
      response_mime_type: "application/json",
      temperature: 0.7,
    }
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Critical failure communicating with Gemini API infrastructure.");
  }

  const data = await response.json();
  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!textResponse) throw new Error("Received an empty or fatally malformed vector from Gemini node.");

  try {
    return JSON.parse(textResponse);
  } catch (e) {
    throw new Error("Failed to natively parse Gemini's JSON payload accurately. Please try generating again.");
  }
};

export const aiService = {
  generateSummary: async (subject, topic) => {
    if (!topic) throw new Error("Topic focus target cannot be entirely empty.");
    
    const context = subject ? `within the explicit architecture of ${subject}` : "in high-level academic frameworks";
    
    const system = `You are an elite Academic AI Tutor. Your strict prime directive is to generate an extraordinarily high-quality educational summary of the user's targeted subject ${context}.
    You MUST always respond internally with STRICT RAW VALID JSON adhering exactly to the following exact key structure implicitly without markdown code block wrappers:
    {
      "type": "summary",
      "definition": "A precise 1-3 sentence beautifully articulated technical definition.",
      "keyPoints": ["Highly specific bullet point 1", "String bullet point 2", "String analytical point 3", "String technical point 4"],
      "example": "A deeply precise real-world applied software/engineering/academic scenario successfully demonstrating the topic functionality."
    }`;

    return await callGemini(system, `Please execute the summary generation module targeting the topic conceptually: ${topic}`);
  },

  generateQuestions: async (subject, topic) => {
    if (!topic) throw new Error("Topic focus target cannot be entirely empty.");
    const context = subject ? `within the technical domain of ${subject}` : "";
    
    const system = `You are a notoriously strict academic examiner. Formulate 5 brilliant testing questions probing the assigned conceptual topic ${context}.
    You MUST inherently respond perfectly mapping to this exact JSON schema implicitly without markdown code block wrappers:
    {
      "type": "questions",
      "questions": [
        { "id": 1, "difficulty": "Easy", "text": "Formulated question text here?" },
        { "id": 2, "difficulty": "Medium", "text": "Secondary question text here?" },
        { "id": 5, "difficulty": "Hard", "text": "Final deep question text here?" }
      ]
    }
    Make sure exactly 1-2 questions are strictly labeled "Easy", 1-2 are "Medium", and 1-2 are "Hard". Ensure the IDs sequentially increment from 1 to 5 identically.`;

    return await callGemini(system, `Execute an examination node dynamically targeting: ${topic}`);
  },

  generateFlashcards: async (subject, topic) => {
    if (!topic) throw new Error("Topic focus target cannot be entirely empty.");
    const context = subject ? `within the analytical domain of ${subject}` : "";
    
    const system = `You are a pure structural spaced-repetition memory architect. Dynamically compute 5 highly practical study flashcards precisely mapping to the concept ${context}.
    You MUST inherently respond solely in raw JSON adhering exactly to this exact schema implicitly without markdown code block wrappers:
    {
      "type": "flashcards",
      "cards": [
        { "id": 1, "front": "Highly focused concept or technical question", "back": "Precise explanatory definition or core mechanism" },
        { "id": 2, "front": "...", "back": "..." }
      ]
    }
    Ensure the strictly numeric IDs visually increment logically from 1 to 5. Keep the front and back text arrays intensely focused and structurally crisp for active recall methodologies.`;

    return await callGemini(system, `Compute flashcard matrix mapping directly to the structural topic: ${topic}`);
  }
};
