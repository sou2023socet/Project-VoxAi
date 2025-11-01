/**
 * API Service
 * 
 * Centralized API service for all backend communication.
 * Handles authentication, error handling, and request interceptors.
 * 
 * @module services/api
 */

import axios from 'axios';
import { API_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from '../utils/constants';
import { formatErrorMessage } from '../utils/helpers';

/**
 * Creates axios instance with base configuration
 */
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor: Adds authentication token to requests
 * Automatically includes JWT token from localStorage for authenticated requests
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor: Handles global error responses
 * Manages token expiration and network errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Enhance error object with user-friendly message
    error.userMessage = formatErrorMessage(error);
    return Promise.reject(error);
  }
);

/**
 * Authentication API endpoints
 * Handles user registration and login
 */
export const authAPI = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User's full name
   * @param {string} userData.email - User's email address
   * @param {string} userData.password - User's password
   * @param {string[]} userData.interests - Array of user interests
   * @returns {Promise<Object>} - Registration response
   * @throws {Error} - If registration fails
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise<Object>} - Login response with token and user data
   * @throws {Error} - If login fails
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Schemes API endpoints
 * Handles government schemes CRUD operations
 */
export const schemesAPI = {
  /**
   * Get all schemes
   * Public endpoint - no authentication required
   * @returns {Promise<Array>} - Array of scheme objects
   * @throws {Error} - If fetch fails
   */
  getAll: async () => {
    try {
      const response = await api.get('/schemes');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new scheme
   * Protected endpoint - requires authentication
   * @param {Object} schemeData - Scheme data
   * @param {string} schemeData.title - Scheme title (required)
   * @param {string} [schemeData.description] - Scheme description
   * @param {string} [schemeData.category] - Scheme category
   * @param {string} [schemeData.url] - Scheme URL
   * @returns {Promise<Object>} - Created scheme object
   * @throws {Error} - If creation fails
   */
  create: async (schemeData) => {
    try {
      const response = await api.post('/schemes', schemeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Chat API endpoints
 * Handles chatbot interactions and NLP queries
 */
export const chatAPI = {
  /**
   * Send a message to the chatbot
   * Protected endpoint - requires authentication
   * @param {string} message - User's message/query
   * @param {string} [userId] - Optional user ID for personalization
   * @returns {Promise<Object>} - Chatbot response
   * @throws {Error} - If request fails
   */
  sendMessage: async (message, userId = null) => {
    try {
      const response = await api.post('/chat', { message, userId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get chat history for a user
   * Protected endpoint - requires authentication
   * @param {number} [limit=50] - Maximum number of messages to retrieve
   * @returns {Promise<Array>} - Array of chat messages
   * @throws {Error} - If request fails
   */
  getHistory: async (limit = 50) => {
    try {
      const response = await api.get(`/chat/history?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Default export of the axios instance
 * Can be used for custom API calls if needed
 */
export default api;
