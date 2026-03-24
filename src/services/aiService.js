export const aiService = {
  generateSummary: async (topic) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!topic) reject("Topic cannot be empty.");
        resolve(`Here is a dummy summary for the overarching topic: "${topic}".\n\nThis encapsulates the main chronological ideas, core foundational concepts, and standard academic definitions necessary to master this subject effectively.`);
      }, 1500);
    });
  },

  generateQuestions: async (topic) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!topic) reject("Topic cannot be empty.");
        resolve(`Here are dummy practice questions for: "${topic}"\n\n1. What are the key principles of this topic?\n2. How does this methodology impact modern applications?\n3. Can you explain the history and evolution of this subject?\n4. Formulate an edge-case scenario where this framework breaks down.`);
      }, 1500);
    });
  }
};
