const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

exports.sendEmailSendGridServices = async (msg) => {
  sgMail.setApiKey(process.env.SEND_GRID);

  await sgMail.send(msg);
};

exports.sendEmailNodemailerServices = async () => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "",
      pass: "",
    },
  });

  return transporter;

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  //   res
  //     .status(200)
  //     .json({ message: "Application approved and email sent", applicant });
  // });
};
