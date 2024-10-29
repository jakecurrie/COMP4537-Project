// Mock responses for different types of messages
const mockResponses = [
  {
    keywords: ['hello', 'hi', 'hey'],
    responses: [
      "Hello! How are you feeling today? 😊",
      "Hi there! I'm here to help boost your mood! 🌟",
      "Hey! Ready to have a great conversation? 🎉"
    ]
  },
  {
    keywords: ['sad', 'depressed', 'unhappy', 'down'],
    responses: [
      "I hear you. It's okay to feel this way. Would you like to talk about what's bothering you? 🫂",
      "Remember that every cloud has a silver lining. Let's focus on some positive aspects of your day. ✨",
      "Taking small steps forward is still progress. What's one tiny thing that made you smile today? 🌱"
    ]
  },
  {
    keywords: ['happy', 'good', 'great', 'amazing'],
    responses: [
      "That's wonderful to hear! Your positive energy is contagious! 🌟",
      "I'm so glad you're feeling good! What's contributing to your happiness? 🎉",
      "Keep that positive spirit going! You're doing great! ⭐"
    ]
  },
  {
    keywords: ['tired', 'exhausted', 'sleepy'],
    responses: [
      "Rest is important! Have you been taking enough breaks? 😴",
      "Sometimes a short walk or some fresh air can help boost energy levels. Would you like to try that? 🌳",
      "Remember to be kind to yourself and take the rest you need. 💝"
    ]
  },
  {
    keywords: ['angry', 'frustrated', 'mad'],
    responses: [
      "I understand your frustration. Would you like to talk about what's bothering you? 🎧",
      "Taking deep breaths can help calm those feelings. Want to try some breathing exercises? 🫧",
      "It's okay to feel angry. Let's work through these emotions together. 🤝"
    ]
  }
];

export const getResponse = (message: string): string => {
  // Convert message to lowercase for better matching
  const lowercaseMessage = message.toLowerCase();
  
  // Find matching response category
  const matchingCategory = mockResponses.find(category =>
    category.keywords.some(keyword => lowercaseMessage.includes(keyword))
  );

  if (matchingCategory) {
    // Return random response from matching category
    const randomIndex = Math.floor(Math.random() * matchingCategory.responses.length);
    return matchingCategory.responses[randomIndex];
  }

  // Default responses if no keywords match
  const defaultResponses = [
    "Tell me more about that. How does it make you feel? 🤔",
    "I'm here to listen and support you. Would you like to elaborate? 👂",
    "That's interesting! Can you share more about your experience? 💭",
    "I'm here to help! What would you like to talk about? 🌟",
    "Let's explore that further. What are your thoughts on this? 🔍"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};