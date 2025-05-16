const AdsModel = require("../../models/admin/advertismentModel");
const fileService = require("./adsfileService");

async function createAds(adData, topImage, bottomLeftImage, bottomRightImage) {
  // Validate file types
  fileService.validateFileType(topImage, "Top Image");
  fileService.validateFileType(bottomLeftImage, "Bottom Left Image");
  fileService.validateFileType(bottomRightImage, "Bottom Right Image");

  // Upload all images to cloudinary
  const topImageUrl = await fileService.uploadToCloudinary(topImage);
  const bottomLeftImageUrl = await fileService.uploadToCloudinary(
    bottomLeftImage
  );
  const bottomRightImageUrl = await fileService.uploadToCloudinary(
    bottomRightImage
  );

  // Save data to database
  const newAdData = {
    ...adData,
    topImage: topImageUrl,
    bottomLeftImage: bottomLeftImageUrl,
    bottomRightImage: bottomRightImageUrl,
  };

  // Replace the old ad with the new one
  // If no record exists, the upsert: true option creates a new record
  const placedAds = await AdsModel.findOneAndUpdate(
    {}, // Empty filter matches any existing record
    newAdData, // New ad data to replace the old one
    { upsert: true, new: true } // Create a new record if none exists, return the updated record
  );

  return placedAds;
}

async function getAds() {
  const ads = await AdsModel.find({}).select("-__v");

  if (!ads) {
    throw new Error("Failed to get ads");
  }

  return ads;
}

module.exports = {
  createAds,
  getAds,
};
