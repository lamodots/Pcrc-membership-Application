const { User } = require("../../models");
const { createTokenUser } = require("../../utils");
const { attachCookiesToResponse } = require("../../utils");
const { BadRequestError, UnAuthenticatedError } = require("../../errors");

async function addAdminUserService(body) {
  try {
    const emailAlreadyExist = await User.findOne({ email: body.email });

    if (emailAlreadyExist) {
      throw new BadRequestError("Email Already Exist");
    }

    if (
      body.role &&
      body.role !== "user" &&
      body.role !== "admin" &&
      body.role !== "moderator"
    ) {
      throw new BadRequestError("Invalid role specified.");
    }
    const user = new User(body);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function loginAdminServices(email, password) {
  const user = await User.findOne({ email });

  try {
    if (!user) {
      throw new UnAuthenticatedError("Invalid Credential email or password");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError("Invalid Credential email or password");
    }

    const tokenUser = createTokenUser(user);
    return tokenUser;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  addAdminUserService,
  loginAdminServices,
};
