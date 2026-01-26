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
      return res.status(400).json({ error: "Alias already exists" });
    }

    const newUrl = await URL.create({
      fullUrl: longUrl,        // ✅ FIX: match model field
      shortCode,
      customAlias: customAlias || undefined,
    });

    res.json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      shortCode,
    });
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// REDIRECT SHORT URL
router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await URL.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.redirect(url.fullUrl); // ✅ FIX: match model field
  } catch (err) {
    console.error("REDIRECT ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
