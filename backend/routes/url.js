const express = require("express");
const router = express.Router();
const URL = require("../models/URL");

// CREATE SHORT URL (API)
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

    await URL.create({
      fullUrl: longUrl,
      shortCode,
      customAlias: customAlias || undefined,
    });

    res.json({
      shortCode,
      shortUrl: `${process.env.FRONTEND_URL}/${shortCode}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
