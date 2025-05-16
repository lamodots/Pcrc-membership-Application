const { StatusCodes } = require("http-status-codes");
const {
  getUserDetailsService,
  getUserSubscriptionServices,
} = require("../../services");

async function getUserProfileDetails(req, res) {
  const userId = req.user.userId;

  try {
    const user = await getUserDetailsService(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ ok: true, message: "User not found" });
    }

    const subscription = await getUserSubscriptionServices(userId);

    return res.status(StatusCodes.OK).json({ user, subscription });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

module.exports = getUserProfileDetails;
