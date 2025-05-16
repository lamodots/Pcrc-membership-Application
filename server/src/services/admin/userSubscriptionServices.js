const { UserSubscriptionModel } = require("../../models");

async function getUserSubscriptionServices(userId) {
  try {
    const subscription = await UserSubscriptionModel.findOne({ userId: userId })
      .populate("planId", "name interval amount description")
      .lean();

    return subscription;
  } catch (error) {
    throw error;
  }
}

module.exports = getUserSubscriptionServices;
