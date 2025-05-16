const { StatusCodes } = require("http-status-codes");
const adsService = require("../../services/admin/adsService");

async function createAdsController(req, res) {
  try {
    const { topImage, bottomLeftImage, bottomRightImage } = req.files;
    const result = await adsService.createAds(
      req.body,
      topImage,
      bottomLeftImage,
      bottomRightImage
    );

    res.status(StatusCodes.OK).json({
      sucess: true,
      message: "Ads created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in createAdsController:", error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || "An error occurred while creating the ads.",
    });
  }
}

async function getAdsController(req, res) {
  try {
    const ads = await adsService.getAds();

    res.status(StatusCodes.OK).json({
      success: true,
      data: ads,
    });
  } catch (error) {
    console.error("Error in getAdsController:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "An error occurred while getting the ads.",
    });
  }
}

async function editAdsController(req, res) {
  console.log(req);
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Ads edited successfully" });
}

module.exports = { createAdsController, editAdsController, getAdsController };
