const express = require("express");
const { authenticateUser, authorizaPermissions } = require("../../middlewares");
const { getUserProfileDetails } = require("../../controllers");
const {
  getUsersController,
} = require("../../controllers/shared/userControllers");

const userRoute = express.Router();

userRoute.get(
  "/",
  authenticateUser,

  getUsersController
);

module.exports = userRoute;
