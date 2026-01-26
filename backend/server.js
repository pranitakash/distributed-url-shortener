require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/url");

const app = express();

// 🔥 FINAL CORS FIX — DO NOT TWEAK
app.use(
  cors({
    origin: true,          // allow all origins
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false
  })
);

app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api", urlRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
