/**
 * Home Page
 * 
 * Landing page for the VoxAi application.
 * Provides introduction and navigation to key features.
 * 
 * @module pages/Home
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';

/**
 * Home Component
 * Landing page with welcome message and feature highlights
 * 
 * @returns {JSX.Element} Home page component
 */
export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-indigo-600">VoxAi</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Your AI-Powered Information Assistant
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Empowering students, job seekers, and lifelong learners with personalized
          information about government schemes, scholarships, job opportunities, and
          educational resources.
        </p>

        {isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CHAT}
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl"
            >
              💬 Start Chatting with VoxAi
            </Link>
            <Link
              to={ROUTES.SCHEMES}
              className="inline-block bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl"
            >
              📋 Browse Schemes
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.REGISTER}
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="inline-block bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Chatbot</h3>
            <p className="text-gray-600">
              Interact with our NLP-powered chatbot to get instant answers about schemes,
              scholarships, and opportunities.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Government Schemes</h3>
            <p className="text-gray-600">
              Access comprehensive information about government schemes and programs
              tailored to your needs.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized</h3>
            <p className="text-gray-600">
              Get personalized recommendations based on your profile, interests, and
              interaction history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
