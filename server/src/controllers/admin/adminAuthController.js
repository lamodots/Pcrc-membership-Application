const { StatusCodes } = require("http-status-codes");
const { addAdminUserService, loginAdminServices } = require("../../services");
const { BadRequestError } = require("../../errors");
const { attachCookiesToResponse } = require("../../utils/jwt");

async function addAdminController(req, res, next) {
  const {
    image,
    firstname,
    lastname,
    email,
    password,
    Dob,
    phone,
    location,
    address,
    aboutuser,
    social,
    interest,
  } = req.body;

  try {
    if (!firstname || !lastname || !password || !email) {
      return next(
        new BadRequestError(
          "firstname, lastname, password and email must not be empty!"
        )
      );
    }

    let role = "user";
    if (req.user && req.user.role === "admin") {
      // Admin can assign "admin" role
      role = role =
        req.body.role === "admin"
          ? "admin"
          : req.body.role === "moderator"
          ? "moderator"
          : "user"; // Ensure only admins can set role to "admin"
    }
    await addAdminUserService({
      image,
      firstname,
      lastname,
      email,
      password,
      Dob,
      phone,
      location,
      address,
      aboutuser,
      social,
      interest,
      role,
    });
    res.status(StatusCodes.CREATED).json({
      ok: true,
      message: "New user added successfully",
    });
  } catch (error) {
    return next(error);
  }
}

async function loginAdminController(req, res, next) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(new BadRequestError("Please provide email and password"));
    }
    // Return user token from login services
    const tokenUser = await loginAdminServices(email, password);

    // attach user token to cookie response pass down res to enable you access res.cookie
    attachCookiesToResponse(res, tokenUser);
    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "User logged in successfull", tokenUser });
  } catch (error) {
    return next(error);
  }
}

async function currentUserController(req, res) {
  res.json(req.user);
}
async function logOutController(req, res, next) {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "Strict",
    // expires: new Date(Date.now() + 1000),
    expires: new Date(0),
  });
  res.json({ ok: true, message: "You have been loggedOut" });
}
module.exports = {
  addAdminController,
  loginAdminController,
  logOutController,
  currentUserController,
};
