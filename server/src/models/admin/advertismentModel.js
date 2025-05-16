const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
  topImageLink: String,
  bottomLeftImageLink: String,
  bottomRightImageLink: String,
  topImage: String,
  bottomLeftImage: String,
  bottomRightImage: String,
});

const AdsModel = mongoose.model("AdsModel", adsSchema);

module.exports = AdsModel;
