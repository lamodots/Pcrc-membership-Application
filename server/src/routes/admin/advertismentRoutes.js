const express = require("express");
const AdsController = require("../../controllers/admin/adsController");

const adsRoute = express.Router();
adsRoute.post("/create-ads", AdsController.createAdsController);
adsRoute.get("/", AdsController.getAdsController);

module.exports = adsRoute;
