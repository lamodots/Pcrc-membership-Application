const { BadRequestError } = require("../../errors");
const Applicant = require("../../models");
const {
  createApplicantService,
  getApplicantsByEventService,
  approveApplicantService,
  getApplicantService,
} = require("../../services");
// const Event = require("../models/event");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const { sendEmailSendGridServices } = require("../../config");
const { sendGridEmailTemplate } = require("../../utils");
const { default: mongoose } = require("mongoose");
const ApplicantModel = require("../../models/admin/eventApplicantModel");
const axios = require("axios");
const sendMailFunc = require("../../utils/sendMailFunc");
// const fetch = require("node-fetch");

exports.createApplicant = async (req, res, next) => {
  const {
    full_name,
    email,
    phone_number,
    whatsapp_number,
    number_of_family_members,
    attendees,
    event,
  } = req.body;
  if (
    !full_name ||
    !email ||
    !phone_number ||
    !number_of_family_members ||
    !event
  ) {
    return next(new BadRequestError("Fileds must me filled!"));
  }

  const isAnApplicant = await ApplicantModel.findOne({
    email: email,
    event: event,
  });
  console.log("IS APPLICANT", isAnApplicant);
  if (isAnApplicant) {
    return next(new BadRequestError("Applicant already registered!"));
  }
  try {
    const applicant = await createApplicantService(req.body);

    res.status(201).json({ ok: true, applicant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.approveApplicant = async (req, res, next) => {
  try {
    const { applicant } = await approveApplicantService(
      req.params.applicationId
    );

    const msg = sendGridEmailTemplate(applicant);
    // await sendEmailSendGridServices(msg);
    await sendMailFunc(msg);

    // // Prepare WhatsApp message
    // const familyMembers =
    //   applicant.attendees && applicant.attendees.length > 0
    //     ? applicant.attendees.map((fam) => fam.attendee_full_name).join(", ")
    //     : "None";

    // const whatsappMsg = `
    // Your ticket is ready! 🎉\n\n
    //   Dear ${applicant.full_name} \n
    // Your ticket to the' ${applicant.event.title} has been reserved and we are excited to have you join us for this immersive experience! \n\n
    // Applicant Info:\n
    // Name: ${applicant.full_name}\n
    // Email: ${applicant.email}\n
    // Phone Number: ${applicant.phone_number}\n\n
    // Family member's Info: ${familyMembers}
    // Event Info:\n
    // Event: ${applicant.event.title}\n
    // Time: ${applicant.event.time} \n
    // Phone Number: ${applicant.phone_number} \n\n

    // QR Code: https://api.qrserver.com/v1/create-qr-code/?data=${applicant._id}

    // `;

    // // Send WhatsApp message using Facebook Graph API
    // const response = await axios.post(
    //   "https://graph.facebook.com/v18.0/592162563970929/messages",
    //   {
    //     messaging_product: "whatsapp",
    //     recipient_type: "individual",
    //     to: `${applicant.email}`, // Use the applicant's phone number
    //     type: "text",
    //     text: { body: whatsappMsg },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.FB_ACCESS_TOKEN}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // console.log("WhatsApp API Response:", response.data);

    return res.status(200).json({
      message: "Application approved and email sent",
      applicant,
    });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

exports.getApplicantByEvent = async (req, res, next) => {
  const { applicantQRCode } = req.body;
  const { eventId } = req.params;

  try {
    const applicant = await getApplicantService(eventId, applicantQRCode);

    if (!applicant) {
      return res
        .status(404)
        .json({ ok: false, message: "Applicant not found" });
    }

    // Check if the applicant is not approved
    if (!applicant.isapproved) {
      return res
        .status(400)
        .json({ ok: false, message: "Applicant not approved yet" });
    }

    // Check if the applicant has already attended
    if (applicant.attended) {
      return res
        .status(400)
        .json({ ok: false, message: "Duplicate Entry Detected" });
    }

    // Mark applicant as attended
    applicant.attended = true;
    await applicant.save();

    return res
      .status(200)
      .json({ ok: true, message: "Scan Successful!", applicant });
  } catch (error) {
    console.error("Error in getApplicantByEvent:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to scan application!" });
  }
};

exports.getApplicantsByEvent = async (req, res) => {
  try {
    const applicants = await getApplicantsByEventService(req.params.eventId);

    res.status(200).json({ ok: true, count: applicants.length, applicants });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
