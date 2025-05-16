const express = require("express");
const {
  userProfileController,
  updateUserProfileController,
} = require("../controllers");

const userProfileRoute = express.Router();

userProfileRoute.get("/:userId", userProfileController);
userProfileRoute.put("/:userId", updateUserProfileController);

module.exports = userProfileRoute;
