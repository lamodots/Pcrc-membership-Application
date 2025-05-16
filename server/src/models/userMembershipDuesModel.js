const mongoose = require("mongoose");

const UserMemberShipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  email: { type: String },
  full_name: { type: String },
  membershipType: {
    type: String,
    enum: ["Life membership", "Annual membership", "Honorary"],
  },
  amount: { type: Number },
  startDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  year: { type: String },
  status: {
    type: String,
    enum: ["active", "pending", "expired"],
    default: "expired",
  },
  isMemberShipDuePaid: { type: Boolean, default: false },
  paymentMethod: { type: String, enum: ["offline", "online"] },
  paymentReference: { type: String },
  paymentDate: { type: Date },
  channel: { type: String },
  account_name: { type: String },
  bank: { type: String },
});
// Add this to your model or schema definition
UserMemberShipSchema.index({ expiryDate: 1, status: 1 });
module.exports = mongoose.model("MembershipDues", UserMemberShipSchema);
