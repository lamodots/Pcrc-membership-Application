const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/scan", (req, res) => {
  const { qrCode } = req.body;
  // Logic to retrieve applicant data based on QR code
  const applicant = {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone_number: "123-456-7890",
    whatsapp_number: "987-654-3210",
    number_of_family_members: 2,
    attendees: [
      { _id: 1, attendee_full_name: "Jane Doe" },
      { _id: 2, attendee_full_name: "Jim Doe" },
    ],
  };
  res.json(applicant);
});
