const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    verificationCode: {
      type: String,
      required: true,
    },

    verificationCodeExpires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);

module.exports = PendingUser;