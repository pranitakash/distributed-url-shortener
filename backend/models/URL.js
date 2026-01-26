const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customAlias: {
      type: String,
      sparse: true  // Allows null but enforces uniqueness when provided
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("URL", urlSchema);
