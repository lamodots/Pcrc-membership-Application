const mongoose = require("mongoose");
const { BadRequestError } = require("../../errors");
const Applicant = require("../../models");

exports.createApplicantService = async (applicantData) => {
  const applicant = new Applicant.Applicants(applicantData);
  await applicant.save();

  return applicant;
};

exports.approveApplicantService = async (applicantId) => {
  const applicant = await Applicant.Applicants.findById(applicantId).populate(
    "event",
    "title photoImage time venue"
  );

  if (!applicant) {
    throw new Error("Applicant not found");
  }
  if (applicant.isapproved) {
    throw new Error("Applicant already approved");
  }
  applicant.barCode = `https://api.qrserver.com/v1/create-qr-code/?data=${applicant._id}`;
  applicant.isapproved = true;
  await applicant.save();
  console.log(applicant);
  return { applicant };
};

exports.getApplicantService = async (eventId, applicantQRCode) => {
  try {
    const applicant = await Applicant.Applicants.findOne({
      event: eventId,
      _id: applicantQRCode,
    });

    // Return null if no applicant is found
    if (!applicant) {
      return null;
    }

    return applicant; // Return the applicant object to the controller
  } catch (error) {
    console.error("Error in getApplicantService:", error);
    throw new Error("Failed to fetch applicant");
  }
};
// get all aplicant for an event
exports.getApplicantsByEventService = async (event) => {
  return await Applicant.Applicants.find({ event });
};
