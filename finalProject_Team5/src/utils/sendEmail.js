const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Final Project Team" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

// ==========================================
// Send Password Reset Email using Resend
// ==========================================

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetEmail = async (options) => {
  const { data, error } = await resend.emails.send({
    from: "Final Project Team <onboarding@resend.dev>",
    to: [options.email],
    subject: options.subject,
    html: options.html,
  });

  if (error) {
    console.error("RESEND EMAIL ERROR:", error);
    throw new Error(error.message || "Failed to send reset email");
  }

  return data;
};

module.exports = {
  sendEmail,
  sendResetEmail,
};