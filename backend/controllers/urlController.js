const URL = require("../models/URL");
const crypto = require("crypto");

// Generate random short code
const generateShortCode = () => {
  return crypto
    .randomBytes(3)
    .toString("base64")
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .slice(0, 6);
};

// POST /api/urls - Always create NEW short URL (even for same longUrl)
exports.shortenUrl = async (req, res) => {
  const { longUrl, customAlias } = req.body;

  // Validate URL
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (!longUrl || !urlRegex.test(longUrl)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    let shortCode;

    if (customAlias && customAlias.trim()) {
      // Custom alias
      const cleanAlias = customAlias.trim();
      if (await URL.findOne({ shortCode: cleanAlias })) {
        return res.status(409).json({ error: "Custom alias already taken" });
      }
      shortCode = cleanAlias;
    } else {
      // Random short code
      do {
        shortCode = generateShortCode();
      } while (await URL.findOne({ shortCode }));
    }

    // Always create NEW record (even duplicate longUrl)
    const url = new URL({
      fullUrl: longUrl,
      shortCode,
      customAlias: customAlias?.trim() || null
    });

    await url.save();

    res.json({
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      longUrl: longUrl,
      message: customAlias ? `Custom alias "${shortCode}" created!` : "Short URL generated!"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /:shortCode - redirect (unchanged)
exports.redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await URL.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.redirect(url.fullUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
