const mongoose = require("mongoose");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
const {
  createSubscriptionServices,
  getAllSubscriptionServices,
  getSingleSubscriptionServices,
  deleteSubscriptionServices,
  editSubscriptionServices,
  verifyPaymentServices,
} = require("../../services");
const { calculateExpiryDate } = require("../../utils");

async function createSubscriptions(req, res, next) {
  const { title, description, interval, amount } = req.body;

  if (!title || !description || !interval || !amount) {
    throw new BadRequestError("Subscription information required");
  }

  try {
    const subscription = await createSubscriptionServices({
      name: title,
      description: description,
      interval: interval,
      amount: amount,
      createdBy: req.user.userId,
    });

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    return next(error);
  }
}

async function getAllSubscriptions(req, res, next) {
  const subscriptions = await getAllSubscriptionServices();

  if (subscriptions.length == []) {
    return res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "No Subscription" });
  }
  res.status(StatusCodes.OK).json({ ok: true, subscriptions });
}

async function getSingleSubscriptions(req, res, next) {
  try {
    const { id } = req.params;
    console.log(typeof id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    const subscription = await getSingleSubscriptionServices(id);

    res.status(StatusCodes.OK).json({ ok: true, subscription });
  } catch (error) {
    return next(error);
  }
}

async function editSubscriptions(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    const subscription = await editSubscriptionServices(id, body);

    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Subscription Edited", subscription });
  } catch (error) {
    return next(error);
  }
}
async function deleteSubscriptions(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    await deleteSubscriptionServices(id);

    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Subscription Deleted" });
  } catch (error) {
    return next(error);
  }
}

async function verifyPayment(req, res, next) {
  const fetch = (await import("node-fetch")).default;
  const { reference, planId } = req.body;
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const jsonResponse = await response.json();
    if (jsonResponse.status) {
      const plan = await getSingleSubscriptionServices(planId);

      if (!plan) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ ok: false, message: "Subscription plan not found" });
      }
      // Calculate expiry date

      const startDate = new Date();
      const expiryDate = calculateExpiryDate(plan.interval);
      const subscription = await verifyPaymentServices(
        "675031648e434705451d4c60", // Replace with actual user ID
        planId,
        startDate,
        expiryDate
      );

      return res.status(StatusCodes.OK).json({
        message: "Subscription successful",
        subscription,
        planDetails: plan, // Include plan details if needed
      });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ ok: true, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error verifying payment" });
  }
}
module.exports = {
  createSubscriptions,
  getAllSubscriptions,
  getSingleSubscriptions,
  editSubscriptions,
  deleteSubscriptions,
  verifyPayment,
};
