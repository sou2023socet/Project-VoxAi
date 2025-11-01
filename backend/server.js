/**
 * VoxAi Backend Server
 * 
 * Main Express server configuration for VoxAi application.
 * Handles routing, middleware setup, and database connection.
 * 
 * @module server
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import schemeRoutes from "./routes/schemes.js";
import chatRoutes from "./routes/chat.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies

// Database Connection
connectDB();

// API Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/schemes", schemeRoutes); // Government schemes routes
app.use("/api/chat", chatRoutes); // Chatbot routes

// Root endpoint - Health check
app.get("/", (req, res) => {
  res.json({
    message: "VoxAi backend running ✅",
    version: "1.0.0",
    status: "active"
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    msg: "Route not found. Please check the API endpoint." 
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    msg: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 VoxAi backend server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
