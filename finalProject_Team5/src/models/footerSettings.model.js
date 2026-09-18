const mongoose = require("mongoose");

const footerSettingsSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      default: "01092362189",
    },

    email: {
      type: String,
      default: "support@shoply.com",
    },

    location: {
      type: String,
      default: "Egypt",
    },

    facebook: {
      type: String,
      default: "https://web.facebook.com/mohamed.gaber.92702?locale=ar_AR",
    },

    instagram: {
      type: String,
      default: "https://www.instagram.com/",
    },

    twitter: {
      type: String,
      default: "https://x.com/?lang=ar",
    },

    youtube: {
      type: String,
      default: "https://www.youtube.com/?app=desktop&hl=ar",
    },
  },
  {
    timestamps: true,
  }
);

const FooterSettings = mongoose.model(
  "FooterSettings",
  footerSettingsSchema
);

module.exports = FooterSettings;