const axios = require("axios");
const User = require("../models/User"); // Import your User model

const WHATSAPP_API_URL =
  "https://graph.facebook.com/v17.0/your-whatsapp-number-id/messages";
const ACCESS_TOKEN = "your_facebook_api_access_token";

// Function to check if today is the user's birthday
function isBirthday(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  return (
    today.getDate() === birthDate.getDate() &&
    today.getMonth() === birthDate.getMonth()
  );
}

// Function to send WhatsApp message
async function sendBirthdayMessage(user) {
  const message = `Happy Birthday, ${user.firstname}! 🎉 We hope you have a fantastic day filled with joy and happiness.`;

  try {
    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: "whatsapp",
        to: user.phone,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`WhatsApp message sent to ${user.firstname}:`, response.data);
  } catch (error) {
    console.error(
      `Error sending WhatsApp message to ${user.firstname}:`,
      error.response?.data || error.message
    );
  }
}

// Function to process all users and send birthday messages
async function processBirthdays() {
  try {
    const users = await User.find(); // Fetch all users (optimize query as needed)
    users.forEach((user) => {
      if (isBirthday(user.Dob)) {
        sendBirthdayMessage(user);
      }
    });
  } catch (error) {
    console.error("Error processing birthdays:", error.message);
  }
}

module.exports = { processBirthdays };
