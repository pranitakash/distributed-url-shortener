const express = require("express");
const router = express.Router();
const URL = require("../models/URL");

// CREATE SHORT URL
router.post("/urls", async (req, res) => {
  try {
    const { longUrl, customAlias } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: "Long URL is required" });
    }

    const shortCode =
      customAlias || Math.random().toString(36).substring(2, 6);

    const existing = await URL.findOne({ shortCode });
    if (existing) {
      return res.status(400).json({ error: "Alias already in use" });
    }

    const newUrl = await URL.create({
      longUrl,
      shortCode,
    });

    res.json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      shortCode,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔥 REDIRECT SHORT URL
router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await URL.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(url.longUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
