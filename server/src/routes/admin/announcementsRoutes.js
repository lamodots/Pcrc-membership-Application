const express = require("express");
const {
  createAnnouncment,
  getAllAnnoucements,
  getSingleAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
} = require("../../controllers");

const { authenticateUser, authorizaPermissions } = require("../../middlewares");
const announcementsRoute = express.Router();

announcementsRoute.post(
  "/",
  authenticateUser,
  authorizaPermissions("admin"),
  createAnnouncment
);
announcementsRoute.get("/", getAllAnnoucements);
announcementsRoute.get("/:id", getSingleAnnouncement);
announcementsRoute.put(
  "/:id",
  authenticateUser,
  authorizaPermissions("admin"),
  editAnnouncement
);
announcementsRoute.delete(
  "/:id",
  authenticateUser,
  authorizaPermissions("admin"),
  deleteAnnouncement
);

module.exports = announcementsRoute;
