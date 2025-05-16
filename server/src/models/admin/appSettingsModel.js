const mongoose = require("mongoose");
const secretarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
});
const appSettingsSchema = new mongoose.Schema({
  appname: String,
  appname_acronym: String,
  paymentapi: String,
  whatsappapi: String,
  pagelink: [String],
  applogo: String,
  sendgridapi: String,
  welfare_fee: Number,
  lifetime_fee: Number,
  annual_fee: Number,
  secretaries: [secretarySchema],
});

module.exports = mongoose.model("AppSettings", appSettingsSchema);
