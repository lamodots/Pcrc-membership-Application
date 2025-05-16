const { BadRequestError } = require("../../errors");
const { SubscriptionModel, UserSubscriptionModel } = require("../../models");

async function createSubscriptionServices(body) {
  const subscription = new SubscriptionModel(body);

  await subscription.save();

  return subscription;
}
async function getAllSubscriptionServices() {
  try {
    const subscriptions = await SubscriptionModel.find({}).populate({
      path: "createdBy",
      select: "firstname lastname -_id",
    });

    return subscriptions;
  } catch (error) {
    throw new Error("Failed to fetch Subscription. Please try again later.");
  }
}
async function getSingleSubscriptionServices(id) {
  try {
    const subscription = await SubscriptionModel.findById(id);
    if (!subscription) {
      throw new BadRequestError(`Subscription with ${id} does not exist`);
    }
    return subscription;
  } catch (error) {
    throw error;
  }
}
async function editSubscriptionServices(id, body) {
  try {
    const subscription = await SubscriptionModel.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!subscription) {
      throw new BadRequestError(
        ` Failed to edit Subscription with ${id} try again`
      );
    }
    return subscription;
  } catch (error) {
    throw error;
  }
}
async function deleteSubscriptionServices(id) {
  try {
    const subscription = await SubscriptionModel.findByIdAndDelete(id);
    if (!subscription) {
      throw new BadRequestError(`Subscription with ${id} does not exist`);
    }
    return subscription;
  } catch (error) {
    throw error;
  }
}
async function verifyPaymentServices(userId, planId, startDate, expiryDate) {
  try {
    const subscription = new UserSubscriptionModel({
      userId,
      planId,
      startDate,
      expiryDate,
      status: "active",
    });

    await subscription.save();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSubscriptionServices,
  getAllSubscriptionServices,
  getSingleSubscriptionServices,
  editSubscriptionServices,
  deleteSubscriptionServices,
  verifyPaymentServices,
};
