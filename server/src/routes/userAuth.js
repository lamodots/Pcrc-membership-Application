const express = require("express");
const {
  registerUserController,
  loginUserController,
  verifyEmailController,
  logOutUserController,
  forgotUserPasswordController,
  resetUserPasswordController,
  completeOnboarding,
  resendVerificationEmailController,
} = require("../controllers");

const userAuth = express.Router();

userAuth.post("/register", registerUserController);
userAuth.post("/verify", verifyEmailController);
userAuth.post("/resent-verify-email", resendVerificationEmailController);
userAuth.post("/login", loginUserController);

userAuth.post("/logout", logOutUserController);
userAuth.post("/forgot-password", forgotUserPasswordController);
userAuth.post("/reset-password", resetUserPasswordController);
userAuth.patch("/onboarding/:email", completeOnboarding);

module.exports = userAuth;
