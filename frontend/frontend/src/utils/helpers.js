/**
 * Utility Helper Functions
 * 
 * Reusable helper functions for common operations
 * like validation, formatting, and error handling.
 */

import { VALIDATION_RULES } from './constants';

/**
 * Validates an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return VALIDATION_RULES.EMAIL_REGEX.test(email.trim());
};

/**
 * Validates a password
 * @param {string} password - Password to validate
 * @returns {{isValid: boolean, message: string}} - Validation result
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
    };
  }
  
  if (password.length > VALIDATION_RULES.PASSWORD_MAX_LENGTH) {
    return {
      isValid: false,
      message: `Password must not exceed ${VALIDATION_RULES.PASSWORD_MAX_LENGTH} characters`,
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validates a name
 * @param {string} name - Name to validate
 * @returns {{isValid: boolean, message: string}} - Validation result
 */
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, message: 'Name is required' };
  }
  
  const trimmedName = name.trim();
  if (trimmedName.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`,
    };
  }
  
  if (trimmedName.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    return {
      isValid: false,
      message: `Name must not exceed ${VALIDATION_RULES.NAME_MAX_LENGTH} characters`,
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Parses comma-separated interests string into array
 * @param {string} interestsString - Comma-separated interests string
 * @returns {string[]} - Array of trimmed interest strings
 */
export const parseInterests = (interestsString) => {
  if (!interestsString || typeof interestsString !== 'string') {
    return [];
  }
  
  return interestsString
    .split(',')
    .map((interest) => interest.trim())
    .filter((interest) => interest.length > 0);
};

/**
 * Formats date to readable string
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Formats error message from API response
 * @param {Error} error - Error object from axios
 * @returns {string} - User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred';
  
  // Axios error structure
  if (error.response) {
    // Server responded with error status
    return error.response.data?.msg || error.response.data?.message || 'Server error occurred';
  }
  
  if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  }
  
  // Error in setting up the request
  return error.message || 'An unexpected error occurred';
};

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add if truncated (default: '...')
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Debounce function to limit function execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

