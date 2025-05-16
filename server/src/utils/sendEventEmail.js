const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
// WE ARE NOT USING THIS
const app = express();
app.use(bodyParser.json());

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Or your preferred email service
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Registration route
app.post("/register", async (req, res) => {
  const { fullname, email, phone } = req.body;

  if (!fullname || !email || !phone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Generate QR code with user information
    const qrData = `Name: ${fullname}\nEmail: ${email}\nPhone: ${phone}`;
    const qrCodeImage = await QRCode.toDataURL(qrData);

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Registration Complete - Your QR Code",
      html: `
        <h2>Welcome, ${fullname}!</h2>
        <p>Thank you for registering. Below is your QR code:</p>
        <img src="${qrCodeImage}" alt="QR Code" />
        <p>Keep this QR code safe. It may be required for event check-in.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).json({
      message: "Registration successful! QR code sent to your email.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the QR code." });
  }
});
