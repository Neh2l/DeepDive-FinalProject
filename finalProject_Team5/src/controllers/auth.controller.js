const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/user.model");
const PendingUser = require("../models/pendingUser.model");

const generateToken = require("../utils/generateToken");

const { sendEmail, sendResetEmail } = require("../utils/sendEmail");

// ==========================================
// REGISTER
// ==========================================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user is already registered
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    // Remove any old pending registration for this email
    await PendingUser.deleteOne({
      email: normalizedEmail,
    });

    // Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const verificationCodeExpires =
      Date.now() + 10 * 60 * 1000;

    // Hash password before storing it temporarily
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user temporarily in PendingUser
    const pendingUser = await PendingUser.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires,
    });

    // Send verification email
    try {
      await sendEmail({
        email: pendingUser.email,
        subject: "Email Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Welcome to Our E-commerce Project!</h2>

            <p>Your verification code is:</p>

            <h1 style="
              color: #4CAF50;
              letter-spacing: 2px;
            ">
              ${verificationCode}
            </h1>

            <p>This code expires in 10 minutes.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);

      // Remove pending user if email could not be sent
      await PendingUser.deleteOne({
        _id: pendingUser._id,
      });

      return res.status(500).json({
        message: "Could not send verification email. Please try again.",
      });
    }

    res.status(201).json({
      message:
        "Registration started. Please check your email for the verification code.",
      email: pendingUser.email,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// VERIFY EMAIL
// ==========================================

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        message: "Email and verification code are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find the temporary user
    const pendingUser = await PendingUser.findOne({
      email: normalizedEmail,
    });

    if (!pendingUser) {
      return res.status(404).json({
        message: "Registration not found or already verified",
      });
    }

    // Check verification code and expiration
    if (
      pendingUser.verificationCode !== code ||
      pendingUser.verificationCodeExpires < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired verification code",
      });
    }

    // Create the REAL user only after successful verification
    const user = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      role: "Buyer",
      isVerified: true,
    });

    // Delete temporary registration
    await PendingUser.deleteOne({
      _id: pendingUser._id,
    });

    // Generate login token
    const token = generateToken(user);

    res.status(200).json({
      message: "Email verified successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      token,
    });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first before logging in",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// FORGOT PASSWORD
// ==========================================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    // Don't reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        message:
          "If an account with this email exists, a password reset link has been sent.",
      });
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before storing it in database
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires after 15 minutes
    const resetPasswordExpires =
      Date.now() + 15 * 60 * 1000;

    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = resetPasswordExpires;

    await user.save();

    // Frontend URL
    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5174";

    const resetUrl =
      `${frontendUrl}/reset-password/${resetToken}`;

    try {
      await sendResetEmail({
        email: user.email,

        subject: "Reset Your Password",

        html: `
          <div style="
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 40px 20px;
          ">

            <div style="
              max-width: 600px;
              margin: auto;
              background: white;
              padding: 40px;
              border-radius: 16px;
            ">

              <h2 style="
                margin-bottom: 20px;
                color: #111827;
              ">
                Reset Your Password
              </h2>

              <p style="
                color: #4b5563;
                line-height: 1.6;
              ">
                We received a request to reset your password.
              </p>

              <p style="
                color: #4b5563;
                line-height: 1.6;
              ">
                Click the button below to create a new password.
              </p>

              <div style="margin: 30px 0;">
                <a
                  href="${resetUrl}"
                  style="
                    display: inline-block;
                    background-color: #ffd600;
                    color: #111827;
                    text-decoration: none;
                    padding: 14px 24px;
                    border-radius: 10px;
                    font-weight: bold;
                  "
                >
                  Reset Password
                </a>
              </div>

              <p style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
              ">
                This link will expire in 15 minutes.
              </p>

              <p style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
              ">
                If you didn't request a password reset, you can safely
                ignore this email.
              </p>

            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("RESET EMAIL ERROR:", emailError);

      // Remove reset token if email failed
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      return res.status(500).json({
        message: "Could not send reset email. Please try again.",
      });
    }

    res.status(200).json({
      message:
        "If an account with this email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// RESET PASSWORD
// ==========================================

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Reset token is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Hash the token received from the URL
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Reset link is invalid or has expired",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Make reset token unusable
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
};