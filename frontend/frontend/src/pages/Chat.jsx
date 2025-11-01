/**
 * Chat Page
 * 
 * AI-powered chatbot interface for user interaction.
 * Provides NLP-based chat interface to answer user queries about
 * schemes, scholarships, jobs, and educational resources.
 * 
 * @module pages/Chat
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { chatAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatErrorMessage } from '../utils/helpers';
import { PERFORMANCE_THRESHOLDS } from '../utils/constants';

/**
 * Message interface
 * @typedef {Object} Message
 * @property {string} id - Unique message ID
 * @property {string} text - Message text
 * @property {boolean} isUser - True if message is from user
 * @property {Date} timestamp - Message timestamp
 */

/**
 * Chat Component
 * NLP-based chatbot interface for user queries
 * 
 * @returns {JSX.Element} Chat page component
 */
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useAuth();

  /**
   * Scrolls to bottom of messages
   */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /**
   * Scrolls to bottom when messages change
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /**
   * Initialize chat with welcome message
   */
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      text: `Hello${user?.name ? `, ${user.name}` : ''}! I'm VoxAi, your AI-powered assistant. I can help you find information about government schemes, scholarships, job opportunities, and educational resources. How can I assist you today?`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [user?.name]);

  /**
   * Handles input field changes
   * 
   * @param {Event} e - Change event
   */
  const handleChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  /**
   * Handles form submission
   * Sends user message to chatbot API
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || loading) {
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const startTime = Date.now();
      
      // Send message to chatbot API
      const response = await chatAPI.sendMessage(userMessage.text, user?.id);

      const responseTime = Date.now() - startTime;

      // Check if response meets performance threshold (2 seconds)
      if (responseTime > PERFORMANCE_THRESHOLDS.CHATBOT_RESPONSE) {
        console.warn(`Chatbot response time (${responseTime}ms) exceeds threshold (${PERFORMANCE_THRESHOLDS.CHATBOT_RESPONSE}ms)`);
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response.message || response.response || 'I apologize, but I couldn\'t process your request. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);

      const errorBotMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I encountered an error processing your request. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorBotMessage]);
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  /**
   * Handles Enter key press (without Shift)
   * Submits form if Enter is pressed, allows new line with Shift+Enter
   * 
   * @param {Event} e - Key down event
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  /**
   * Clears chat history
   */
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      const welcomeMessage = {
        id: 'welcome',
        text: `Hello${user?.name ? `, ${user.name}` : ''}! I'm VoxAi, your AI-powered assistant. How can I assist you today?`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">VoxAi Chat</h1>
            <p className="text-sm text-gray-600">AI-Powered Information Assistant</p>
          </div>
          <button
            onClick={handleClearChat}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Clear chat"
          >
            Clear Chat
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 shadow-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.text}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    message.isUser ? 'text-indigo-200' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 shadow-md rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">VoxAi is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 py-2">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
              rows={1}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition"
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-500 text-center">
            Ask me about government schemes, scholarships, jobs, courses, or any other information you need!
          </p>
        </div>
      </div>
    </div>
  );
}

