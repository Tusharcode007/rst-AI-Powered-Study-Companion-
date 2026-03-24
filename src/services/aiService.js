export const aiService = {
  generateSummary: async (subject, topic) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!topic) reject("Topic cannot be empty.");
        resolve({
          type: 'summary',
          definition: `A comprehensive overview of ${topic}${subject ? ` in the general context of ${subject}` : ''}.`,
          keyPoints: [
            "Fundamental principles and their immediate applications.",
            "Historical context and evolution over time.",
            "Common methodologies used to solve standard problems.",
            "Critical evaluation and limitations of the approach."
          ],
          example: `For instance, when strictly applying the concepts of ${topic}, practitioners often use benchmark models to derive expected outcomes before full deployment in real-world environments.`
        });
      }, 1500);
    });
  },

  generateQuestions: async (subject, topic) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!topic) reject("Topic cannot be empty.");
        resolve({
          type: 'questions',
          questions: [
            { id: 1, difficulty: 'Easy', text: `What is the most basic academic definition of ${topic}?` },
            { id: 2, difficulty: 'Easy', text: `Can you outline three primary core components of ${topic}?` },
            { id: 3, difficulty: 'Medium', text: `How does ${topic} inherently contrast with its closest popular alternative?` },
            { id: 4, difficulty: 'Medium', text: `Explain a real-world scenario where utilizing ${topic} would provide the optimal solution.` },
            { id: 5, difficulty: 'Hard', text: `Analyze the long-term structural impact of adopting ${topic} within ${subject || 'a broad framework'}.` }
          ]
        });
      }, 1500);
    });
  },

  generateFlashcards: async (subject, topic) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!topic) reject("Topic cannot be empty.");
        resolve({
          type: 'flashcards',
          cards: [
            { id: 1, front: `Core Principle concerning ${topic}`, back: `The central idea that strictly governs and maintains the behavior of the designated system.` },
            { id: 2, front: `Primary Operational Benefit`, back: `Maximizes overall system efficiency and radically reduces standard implementation overhead.` },
            { id: 3, front: `Most Common Practical Pitfall`, back: `Severe over-optimization ultimately leading to extremely fragile, highly rigid architectures.` },
            { id: 4, front: `Historical Founder or Origin`, back: `Developed dynamically through years of iterative academic research and industry consensus.` }
          ]
        });
      }, 1500);
    });
  }
};
