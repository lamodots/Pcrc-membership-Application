const express = require("express");
const {
  appSettingsController,
  getAppSettingsController,
} = require("../../controllers/admin/appSettingsController");
const { authenticateUser, authorizaPermissions } = require("../../middlewares");

const appSettings = express.Router();

appSettings.post(
  "/",
  authenticateUser,
  authorizaPermissions("admin"),
  appSettingsController
);
appSettings.get(
  "/",
  // authenticateUser,
  // authorizaPermissions("admin"),
  getAppSettingsController
);

module.exports = appSettings;
