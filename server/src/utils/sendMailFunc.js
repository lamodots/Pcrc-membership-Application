// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// require("dotenv").config();

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// //setting up refresh token.
// oAuth2Client.setCredentials({
//   refresh_token: process.env.OAUTH_REFRESH_TOKEN,
// });

// const sendMailFunc = async (msg) => {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     if (!accessToken || !accessToken.token) {
//       throw new Error("Failed to retrieve access token.");
//     }

//     console.log("Access token retrieved successfully.");

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL_HOST,
//         pass: process.env.HOST_PASSWORD,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//         accessToken: accessToken.token,
//       },
//     });

//     await transporter.verify();
//     console.log("Transporter is configured correctly.");

//     // const mailOptions = {
//     //   from: `KSN MEMBERSHIP`,
//     //   to: `crytechcrytech@gmail.com`,
//     //   // replyTo: EMAIL_HOST,
//     //   subject: "Hello welcome",
//     //   text: "Test Message from KSN MEMBERSHIP Website",
//     //   html: `<div>
//     //               <h1>Hello anthony@gmail.com</h1>

//     //               <p>TestMessage from KSN MEMBERSHIP Website</p>
//     //              </div>`,
//     // };

//     await transporter.sendMail(msg);
//     console.log("Email sent successfully.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

/***
 * 
 * My current implementation:

    ✅ Reuses the stored refresh token.

    ✅ Automatically refreshes the access token when it expires.

    ✅ Will continue to work indefinitely, as long as:

        a) The user doesn’t revoke access

        b) You use the refresh token at least once every 6 months
 */

// module.exports = sendMailFunc;
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Tokens = require("../models/gmailTokenModel");

// Initialize OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Function to load refresh token from MongoDB
const loadRefreshToken = async () => {
  const doc = await Tokens.findOne({ name: "gmail" });
  if (!doc) throw new Error("Refresh token not found in DB.");
  console.log("GMAIL REFRESH TOKEN", doc.refresh_token);
  return doc.refresh_token;
};

// Function to update refresh token in MongoDB
const saveRefreshToken = async (newToken) => {
  await Tokens.findOneAndUpdate(
    { name: "gmail" },
    { refresh_token: newToken },
    { upsert: true, new: true }
  );
  console.log("🔁 Refresh token saved to DB.");
};

// Function to get a fresh access token
const getAccessToken = async () => {
  try {
    const refreshToken = await loadRefreshToken();
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const { token, res } = await oAuth2Client.getAccessToken();
    if (!token) throw new Error("Failed to retrieve access token.");

    const newRefreshToken = res?.data?.refresh_token;
    if (newRefreshToken && newRefreshToken !== refreshToken) {
      await saveRefreshToken(newRefreshToken);
    }

    return { accessToken: token, refreshToken };
  } catch (err) {
    console.error("❌ Failed to get access token:", err.message);
    throw err;
  }
};

// Email sender function
const sendMailFunc = async (msg) => {
  try {
    const { accessToken, refreshToken } = await getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_HOST,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken,
        accessToken,
      },
    });

    await transporter.verify();
    console.log("✅ Transporter verified.");

    await transporter.sendMail(msg);
    console.log("📧 Email sent successfully.");
  } catch (err) {
    console.error("❌ Error sending email:", err.message || err);
  }
};

module.exports = sendMailFunc;
