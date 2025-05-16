const express = require("express");
const router = express.Router();
const applicantController = require("../../controllers");
const eventsRoute = require("./eventRoutes");
const { authenticateUser, authorizaPermissions } = require("../../middlewares");

eventsRoute.post("/applicants", applicantController.createApplicant);
eventsRoute.put(
  "/applicants/:applicationId/m/approve",
  authenticateUser,
  authorizaPermissions("admin", "moderator"),
  applicantController.approveApplicant
);
eventsRoute.get(
  "/:eventId/applicants",
  applicantController.getApplicantsByEvent
);
eventsRoute.put("/:eventId/applicant", applicantController.getApplicantByEvent);

// module.exports = router;
