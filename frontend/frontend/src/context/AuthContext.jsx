/**
 * Authentication Context
 * 
 * Provides authentication state management and methods for the entire application.
 * Handles user login, registration, logout, and session management.
 * 
 * @module context/AuthContext
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { STORAGE_KEYS } from '../utils/constants';
import { formatErrorMessage } from '../utils/helpers';

/**
 * Auth Context
 * Contains user state and authentication methods
 */
const AuthContext = createContext(null);

/**
 * Custom hook to access authentication context
 * Must be used within AuthProvider
 * @returns {Object} Auth context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Manages authentication state and provides auth methods to children
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} AuthProvider component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initialize authentication state on mount
   * Checks for existing token and validates it
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

        if (token && userData) {
          try {
            // Verify token is not expired
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
              // Token expired - clear storage
              localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
              localStorage.removeItem(STORAGE_KEYS.USER_DATA);
              setUser(null);
            } else {
              // Token valid - restore user session
              setUser(JSON.parse(userData));
            }
          } catch (decodeError) {
            // Invalid token format - clear storage
            console.error('Token decode error:', decodeError);
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_DATA);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, message?: string}>} Login result
   */
  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authAPI.login({ email, password });

      // Store token and user data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));

      setUser(response.user);
      setLoading(false);
      return { success: true };
    } catch (error) {
      const errorMessage = formatErrorMessage(error);
      setError(errorMessage);
      setLoading(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  }, []);

  /**
   * Register a new user
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @param {string[]} [interests=[]] - Array of user interests
   * @returns {Promise<{success: boolean, message?: string}>} Registration result
   */
  const register = useCallback(async (name, email, password, interests = []) => {
    try {
      setError(null);
      setLoading(true);

      await authAPI.register({ name, email, password, interests });

      setLoading(false);
      return { success: true };
    } catch (error) {
      const errorMessage = formatErrorMessage(error);
      setError(errorMessage);
      setLoading(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  }, []);

  /**
   * Logout current user
   * Clears token and user data from storage
   */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    setUser(null);
    setError(null);
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Context value
   * Contains all auth state and methods
   */
  const value = {
    // State
    user,
    loading,
    error,
    isAuthenticated: !!user,

    // Methods
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
