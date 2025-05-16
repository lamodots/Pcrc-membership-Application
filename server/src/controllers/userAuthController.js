const { StatusCodes } = require("http-status-codes");

const { BadRequestError } = require("../errors");
const {
  registerUserService,
  verifyEmailService,
  userLoginService,
  forgotUserPasswordService,
  resetUserPasswordService,
  completeOnboardingService,
} = require("../services");
const {
  verifyUserEmailTemplate,
  sendResetPassswordEmailTemplate,
} = require("../utils/emailTemplate");
const { sendEmailSendGridServices } = require("../config");
const crypto = require("crypto");
const { User } = require("../models");
const { attachCookiesToResponse } = require("../utils/jwt");
const { string } = require("yup");
const sendWhatsMessage = require("../utils/facebookMessage");
const sendMailFunc = require("../utils/sendMailFunc");
const { NONAME } = require("dns");
// const { sendWhatsMessage } = require("../utils/facebookMessage");

const fullUrl = process.env.PROTOCOL_HOST;

const registerUserController = async (req, res, next) => {
  // const fullUrl = `${req.protocol}://${req.get("host")}`;

  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return next(new BadRequestError("Fields cannot be empty"));
  }

  if (password !== confirmPassword) {
    return next(new BadRequestError("Passwords do not match"));
  }

  try {
    const verificationToken = crypto.randomBytes(40).toString("hex");

    const newUser = await registerUserService({
      email,
      password,
      verificationToken,
    });

    const verifyTemplate = verifyUserEmailTemplate(
      fullUrl,
      newUser.email,
      newUser.verificationToken
    );
    // await sendEmailSendGridServices(verifyTemplate);
    await sendMailFunc(verifyTemplate);
    return res
      .status(StatusCodes.CREATED)
      .json({ ok: true, message: "User created sucessfully" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const verifyEmailController = async (req, res, next) => {
  const { token, email } = req.body;
  console.log("TOKEN CHECK", email, token);
  try {
    const result = await verifyEmailService(email, token);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    // Map generic errors to HTTP-specific errors
    if (error.message === "No verification parameters") {
      return next(new BadRequestError("No verification parameters"));
    }
    if (error.message === "User not found") {
      return next(new BadRequestError("Verification failed! User not found"));
    }
    if (error.message === "Invalid verification token") {
      return next(
        new BadRequestError("Verification failed! Invalid verification token")
      );
    }
    next(error);
  }
};

const resendVerificationEmailController = async (req, res, next) => {
  // Need to resend the user email.
  //
  const { email } = req.body;
  const newUser = await User.findOne({ email });

  if (!newUser) {
    return next(new BadRequestError("No user with such email"));
  }

  try {
    if (newUser.verificationToken === " ") {
      return next(
        new BadRequestError("User Already verified , Proceed to login")
      );
    }
    const verifyTemplate = verifyUserEmailTemplate(
      fullUrl,
      newUser.email,
      newUser.verificationToken
    );
    // await sendEmailSendGridServices(verifyTemplate);
    await sendMailFunc(verifyTemplate);

    res
      .status(200)
      .json({ status: true, message: "Verification email resent!" });
  } catch (error) {
    console.log(error);
  }
};

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Call the service to get thetokenUserPayload token user payload
    const tokenUserPayload = await userLoginService(email, password);

    // Attach tokens to cookies
    attachCookiesToResponse(res, tokenUserPayload);

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "User logged in successfull",
      user: tokenUserPayload,
    });
  } catch (error) {
    if (error.message === "Please provide email and password") {
      return next(new BadRequestError("Please provide email and password"));
    }
    if (error.message === "Invalid credentials") {
      return next(new BadRequestError("Invalid email or password"));
    }
    if (error.message === "Please verify your email") {
      return next(new BadRequestError("Please verify your email to login"));
    }
    next(error);
  }
};

// Onboarding logic
const completeOnboarding = async (req, res) => {
  const email = req.params.email;

  // Extract user data from the request body
  try {
    // Call the onboarding service to complete the onboarding process
    const user = await completeOnboardingService(email, req.body);

    await sendWhatsMessage(user.whatsappId, user.firstname, user.memberId);
    // Return the updated user data in the response
    return res.status(200).json({
      success: true,
      message: "Onboarding completed successfully",
      user,
    });
  } catch (error) {
    console.error("Error completing onboarding:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// user Logout
// const logOutUserController = async (req, res) => {
//   const sameSiteOption =
//     process.env.NODE_ENV === "production" ? "None" : "Strict";
//   res.clearCookie("token", "logout", {
//     httpOnly: true,
//     expires: new Date(0),
//     secure: process.env.NODE_ENV === "production", //Ensure secure cookies in production
//     sameSite: sameSiteOption, // Allow cross-origin cookies
//     signed: true,
//   });

//   res.status(StatusCodes.OK).json({ ok: true, message: "user logged out" });
// };

// PROD user Logout
const logOutUserController = async (req, res) => {
  const isSecure =
    process.env.NODE_ENV === "production" ||
    process.env.FORCE_SECURE === "true";
  res.cookie("token", "logout", {
    httpOnly: true,
    secure: isSecure,
    signed: true,
    expires: new Date(Date.now()),
    sameSite: isSecure ? "None" : "Lax",
    path: "/",
  });

  res.status(StatusCodes.OK).json({ ok: true, message: "user logged out" });
};

const forgotUserPasswordController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new BadRequestError("Please provide valid email"));
  }
  try {
    //check user
    const user = await forgotUserPasswordService(email);
    // const fullUrl = `http://localhost:3000`;
    // send reset email

    const msg = sendResetPassswordEmailTemplate(
      user.passwordToken,
      fullUrl,
      user.email
    );
    // await sendEmailSendGridServices(msg);
    await sendMailFunc(msg);

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "Please check your email for reset password link",
    });
  } catch (error) {
    if (error.message === "Email does not exist or invalid request") {
      return next(new BadRequestError("Email does not exist. invalid request"));
    }
    next(error);
  }
};
const resetUserPasswordController = async (req, res, next) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    return next(new BadRequestError("Please provide all values"));
  }

  try {
    await resetUserPasswordService(email, token, password);
    // Send success response
    res.status(StatusCodes.OK).json({
      ok: true,
      message: "Password reset successful",
    });
  } catch (error) {
    // Map generic errors to HTTP-specific errors
    if (error.message === "Invalid reset request") {
      return next(new BadRequestError("Invalid email or reset request"));
    }
    if (error.message === "Invalid or expired token") {
      return next(new BadRequestError("Invalid or expired token"));
    }
    next(error);
  }
};

module.exports = {
  verifyEmailController,
  registerUserController,
  loginUserController,
  resendVerificationEmailController,
  logOutUserController,
  forgotUserPasswordController,
  resetUserPasswordController,
  completeOnboarding,
};
