const mongoose = require("mongoose");

const UserWelfareSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  email: { type: String },
  full_name: { type: String },
  amount: { type: Number, default: 5000 },
  startDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  year: { type: String },
  status: {
    type: String,
    enum: ["active", "pending", "expired"],
    default: "expired",
  },
  isWelfareDuePaid: { type: Boolean, default: false },
  paymentMethod: { type: String, enum: ["offline", "online"] },
  paymentReference: { type: String },
  paymentDate: { type: Date },
  channel: { type: String },
  account_name: { type: String },
  bank: { type: String },
});

module.exports = mongoose.model("WelfareDues", UserWelfareSchema);
