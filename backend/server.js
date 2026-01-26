require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const URL = require("./models/URL");
const urlRoutes = require("./routes/url");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// API routes
app.use("/api", urlRoutes);

// 🔥 ROOT REDIRECT (THIS IS THE KEY FIX)
app.get("/:shortCode", async (req, res) => {
  try {
    const url = await URL.findOne({ shortCode: req.params.shortCode });
    if (!url) {
      return res.status(404).send("URL not found");
    }
    return res.redirect(url.fullUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
