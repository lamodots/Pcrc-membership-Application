const express = require("express");
const {
  createSubscriptions,
  getAllSubscriptions,
  getSingleAnnouncement,
  editSubscriptions,
  deleteSubscriptions,
  getSingleSubscriptions,
  verifyPayment,
} = require("../../controllers");

const { authenticateUser, authorizaPermissions } = require("../../middlewares");
const subscriptionsRoutes = express.Router();

subscriptionsRoutes.post(
  "/",
  authenticateUser,
  authorizaPermissions("admin"),
  createSubscriptions
);
subscriptionsRoutes.get("/", getAllSubscriptions);
subscriptionsRoutes.get("/:id", getSingleSubscriptions);
subscriptionsRoutes.post("/verify-payment", verifyPayment);
subscriptionsRoutes.put(
  "/:id",
  authenticateUser,
  authorizaPermissions("admin"),
  editSubscriptions
);
subscriptionsRoutes.delete(
  "/:id",
  authenticateUser,
  authorizaPermissions("admin"),
  deleteSubscriptions
);

module.exports = subscriptionsRoutes;
