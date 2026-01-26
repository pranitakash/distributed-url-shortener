require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/url");

const app = express();

/**
 * CORS configuration
 * Allows localhost for development
 * Allows Vercel domain for production
 */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://distributed-url-shortener.vercel.app",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", urlRoutes);

// Health check (optional but useful for Render)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
