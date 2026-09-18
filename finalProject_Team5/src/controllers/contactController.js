const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");

exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    // Save message in MongoDB
    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to you
    await transporter.sendMail({
      from: `"Shoply Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Shoply Contact Message from ${name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 700px;
          margin: 0 auto;
          padding: 30px;
          background: #f5f5f5;
        ">

          <div style="
            background: white;
            padding: 30px;
            border-radius: 16px;
            border: 1px solid #e5e5e5;
          ">

            <h2 style="
              margin-top: 0;
              color: #111;
            ">
              New Shoply Contact Message
            </h2>

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div style="
              background: #f7f7f7;
              padding: 18px;
              border-radius: 10px;
              line-height: 1.7;
              white-space: pre-line;
            ">
              ${message}
            </div>

            <hr style="
              border: none;
              border-top: 1px solid #eee;
              margin: 25px 0;
            " />

            <p style="
              color: #777;
              font-size: 13px;
            ">
              This message was sent from the Shoply Contact Form.
            </p>

          </div>

        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("CONTACT EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json({
      messages: messages.map((msg) => ({
        id: msg._id,
        name: msg.name,
        email: msg.email,
        message: msg.message,
        createdAt: msg.createdAt.toISOString().split("T")[0],
      })),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};