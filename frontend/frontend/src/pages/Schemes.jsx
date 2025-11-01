/**
 * Schemes Page
 * 
 * Displays all available government schemes in a grid layout.
 * Allows authenticated users to add new schemes.
 * 
 * @module pages/Schemes
 */

import { useState, useEffect, useCallback } from 'react';
import { schemesAPI } from '../services/api';
import AddSchemeModal from '../components/AddSchemeModal';
import { formatErrorMessage, formatDate } from '../utils/helpers';

/**
 * Schemes Component
 * Lists all schemes and provides functionality to add new ones
 * 
 * @returns {JSX.Element} Schemes page component
 */
export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  /**
   * Fetches all schemes from the API
   * Public endpoint - no authentication required
   */
  const fetchSchemes = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await schemesAPI.getAll();
      setSchemes(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      setSchemes([]);
      console.error('Error fetching schemes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetches schemes on component mount
   */
  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  /**
   * Handles successful scheme addition
   * Closes modal and refreshes schemes list
   */
  const handleSchemeAdded = useCallback(() => {
    setShowAddModal(false);
    fetchSchemes();
  }, [fetchSchemes]);

  /**
   * Handles modal close
   */
  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Schemes</h1>
            <p className="text-gray-600">Browse all available government schemes and opportunities</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg"
            aria-label="Add new scheme"
          >
            + Add Scheme
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Error loading schemes:</p>
            <p>{error}</p>
            <button
              onClick={fetchSchemes}
              className="mt-2 text-sm underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading schemes...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && schemes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-4 text-gray-600 text-lg font-medium">No schemes available yet</p>
            <p className="text-gray-500 mt-2">Be the first to add one!</p>
          </div>
        )}

        {/* Schemes Grid */}
        {!loading && !error && schemes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <div
                key={scheme._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
              >
                {/* Category Badge */}
                {scheme.category && (
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
                    {scheme.category}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{scheme.title}</h3>

                {/* Description */}
                {scheme.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {scheme.description}
                  </p>
                )}

                {/* URL Link */}
                {scheme.url && (
                  <a
                    href={scheme.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm inline-flex items-center mb-4 transition-colors"
                  >
                    Visit Official Link
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}

                {/* Created Date */}
                {scheme.createdAt && (
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Added {formatDate(scheme.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Scheme Modal */}
        {showAddModal && (
          <AddSchemeModal onClose={handleCloseModal} onSuccess={handleSchemeAdded} />
        )}
      </div>
    </div>
  );
}
