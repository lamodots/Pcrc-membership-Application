const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    name: String,
    interval: {
      type: String,
      enum: ["Life membership", "Annual membership", "Honorary"],

      // required: true,
    },
    amount: Number,
    description: {
      type: String,
      max: 400,
    },

    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Members",
    //   //   required: true,
    // },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      //   required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionSchema);
