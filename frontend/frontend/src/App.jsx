/**
 * VoxAi Frontend Application
 * 
 * Main React application component that sets up routing and authentication.
 * Provides routes for authentication, schemes, and chatbot interface.
 * 
 * @module App
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Schemes from './pages/Schemes';
import Chat from './pages/Chat';
import { ROUTES } from './utils/constants';
import './index.css';

/**
 * App Component
 * Main application component with routing configuration
 * 
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route
              path={ROUTES.SCHEMES}
              element={
                <ProtectedRoute>
                  <Schemes />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.CHAT}
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
