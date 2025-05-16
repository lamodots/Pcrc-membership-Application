const express = require("express");
const {
  addAdminController,
  loginAdminController,
  logOutController,
  currentUserController,
} = require("../../controllers");
const { authenticateUser, authorizaPermissions } = require("../../middlewares");

const adminRoute = express.Router();

adminRoute.post("/login", loginAdminController);

adminRoute.post(
  "/add",
  authenticateUser,
  authorizaPermissions("admin"),
  addAdminController
);

adminRoute.get(
  "/currentUser",
  authenticateUser,
  authorizaPermissions("admin", "moderator"),
  currentUserController
);
adminRoute.get("/logout", authenticateUser, logOutController);
adminRoute.post("/forgot-password", (req, res) => {
  console.log("Admin forgot password");
  res.json({ ok: true });
});

adminRoute.post("/reset-password", (req, res) => {
  console.log("Reset password");
  res.json({ ok: true });
});
module.exports = adminRoute;
