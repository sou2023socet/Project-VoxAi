/**
 * Application Constants
 * 
 * Centralized configuration constants for the VoxAi application.
 * This file contains all reusable constants to maintain consistency
 * and ease of maintenance.
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  DEFAULT_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  USER_DATA: 'user',
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized. Please login again.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred.',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Registration successful! Redirecting to login...',
  SCHEME_CREATED: 'Scheme added successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

/**
 * Route Paths
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SCHEMES: '/schemes',
  CHAT: '/chat',
  PROFILE: '/profile',
  ADMIN: '/admin',
};

/**
 * Response Time Thresholds (in milliseconds)
 */
export const PERFORMANCE_THRESHOLDS = {
  CHATBOT_RESPONSE: 2000, // 2 seconds as per documentation requirement
  API_RESPONSE: 3000,
  PAGE_LOAD: 1000,
};

