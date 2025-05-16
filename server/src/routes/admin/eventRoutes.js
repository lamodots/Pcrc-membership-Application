const express = require("express");
const {
  createEvents,
  getAllEvents,
  getSingleEvent,
  editEvent,
  deleteEvent,
} = require("../../controllers");

const { authenticateUser, authorizaPermissions } = require("../../middlewares");
const eventsRoute = express.Router();

eventsRoute.post(
  "/",
  authenticateUser,
  authorizaPermissions("admin"),
  createEvents
);
eventsRoute.get("/", getAllEvents);
eventsRoute.get("/:id", getSingleEvent);
eventsRoute.put(
  "/:id",
  authenticateUser,
  authorizaPermissions("admin"),
  editEvent
);
eventsRoute.delete(
  "/:id",
  authenticateUser,
  authorizaPermissions("admin"),
  deleteEvent
);

module.exports = eventsRoute;
