/**
 * Chat Routes
 * 
 * Handles chatbot interactions and NLP-based queries.
 * Processes user messages and returns AI-generated responses
 * about government schemes, scholarships, jobs, and educational resources.
 * 
 * @module routes/chat
 */

import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/chat
 * Send a message to the chatbot
 * Protected route - requires authentication
 * 
 * @route POST /api/chat
 * @access Private
 * @param {string} message - User's message/query
 * @param {string} [userId] - Optional user ID for personalization
 * @returns {Object} Chatbot response
 */
router.post("/", auth, async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Validate input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ 
        msg: "Message is required and must be a non-empty string" 
      });
    }

    const userMessage = message.trim().toLowerCase();
    const user = userId || req.user;

    // Basic keyword-based response system
    // In production, this would be replaced with an actual NLP/AI service
    let response = "";

    // Government schemes queries
    if (
      userMessage.includes("scheme") ||
      userMessage.includes("government") ||
      userMessage.includes("schemes")
    ) {
      response = "I can help you find information about government schemes! You can browse all available schemes on the Schemes page. Would you like to search for a specific type of scheme? I can provide information about financial aid, health schemes, educational schemes, and more.";
    }
    // Scholarship queries
    else if (
      userMessage.includes("scholarship") ||
      userMessage.includes("scholarships") ||
      userMessage.includes("financial aid")
    ) {
      response = "I can help you find scholarship opportunities! VoxAi provides information about various scholarships available for students. Would you like information about merit-based scholarships, need-based scholarships, or scholarships for specific fields of study?";
    }
    // Job queries
    else if (
      userMessage.includes("job") ||
      userMessage.includes("jobs") ||
      userMessage.includes("career") ||
      userMessage.includes("employment")
    ) {
      response = "I can assist you with job opportunities and career guidance! Would you like information about government job openings, private sector opportunities, or career development resources?";
    }
    // Education/course queries
    else if (
      userMessage.includes("course") ||
      userMessage.includes("education") ||
      userMessage.includes("learn") ||
      userMessage.includes("skill")
    ) {
      response = "I can help you find educational resources and skill development courses! Would you like information about online courses, certification programs, or skill development initiatives?";
    }
    // Greeting queries
    else if (
      userMessage.includes("hello") ||
      userMessage.includes("hi") ||
      userMessage.includes("hey") ||
      userMessage.startsWith("hii")
    ) {
      response = "Hello! I'm VoxAi, your AI-powered assistant. I can help you find information about government schemes, scholarships, job opportunities, and educational resources. How can I assist you today?";
    }
    // Help queries
    else if (
      userMessage.includes("help") ||
      userMessage.includes("what can you do") ||
      userMessage.includes("capabilities")
    ) {
      response = "I'm VoxAi, an AI-powered information assistant. I can help you with:\n\n• Information about government schemes and programs\n• Scholarship opportunities and financial aid\n• Job openings and career guidance\n• Educational resources and skill development courses\n• Personalized recommendations based on your interests\n\nWhat would you like to know more about?";
    }
    // Default response
    else {
      response = "Thank you for your query! I'm here to help you with information about government schemes, scholarships, job opportunities, and educational resources. Could you please provide more details about what you're looking for? For example, you can ask about:\n\n• 'Show me government schemes'\n• 'Find scholarships for students'\n• 'Job opportunities in [field]'\n• 'Educational courses for [subject]'";
    }

    // Return response
    res.json({
      message: response,
      timestamp: new Date().toISOString(),
      user: user,
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ 
      msg: "An error occurred while processing your message. Please try again." 
    });
  }
});

/**
 * GET /api/chat/history
 * Get chat history for the authenticated user
 * Protected route - requires authentication
 * 
 * @route GET /api/chat/history
 * @access Private
 * @param {number} [limit=50] - Maximum number of messages to retrieve
 * @returns {Array} Array of chat messages
 */
router.get("/history", auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    
    // In production, this would fetch from a database
    // For now, return empty array as history is not persisted
    res.json({
      messages: [],
      limit: limit,
      message: "Chat history feature coming soon. Messages are currently not persisted."
    });
  } catch (err) {
    console.error("Chat history error:", err);
    res.status(500).json({ 
      msg: "An error occurred while retrieving chat history." 
    });
  }
});

export default router;

