const { User } = require("../../models");

async function getUserDetailsService(userId) {
  try {
    const user = await User.findById(userId).select(
      "-password -isVerified -passwordToken -passwordTokenExpirationDate -updatedAt -verificationToken -__v -verified"
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = getUserDetailsService;
