const path = require("path");
const fs = require("fs");

const { StatusCodes } = require("http-status-codes");
const {
  appSettingsServices,
  getAppSettingsServices,
} = require("../../services");
const { BadRequestError } = require("../../errors");
const crypto = require("crypto");

const cloudinary = require("cloudinary").v2;

/** APP SETTINGS CONTROLLER -  Adds app settings to database.**/
async function appSettingsController(req, res, next) {
  console.log("APP FORM SETINGS DATA", req.body);
  const {
    appname,
    appname_acronym,
    paymentapi,
    whatsappapi,
    pagelink,
    sendgridapi,
    welfare_fee,
    lifetime_fee,
    annual_fee,
    secretaries,
  } = req.body;

  if (
    !appname ||
    !appname_acronym ||
    !paymentapi ||
    !whatsappapi ||
    !sendgridapi ||
    !welfare_fee ||
    !lifetime_fee ||
    !annual_fee
  ) {
    return next(new BadRequestError("Add application settings!"));
  }
  const parsedWelfare = parseInt(welfare_fee);
  const parsedeLifetimeFee = parseInt(lifetime_fee);
  const parsedAnnualFee = parseInt(annual_fee);
  const parsedSecretaries = JSON.parse(secretaries);
  try {
    const appLogoImage = req.files.applogo;

    if (!appLogoImage.mimetype.startsWith("image")) {
      return next(
        new BadRequestError(
          "The file you are trying to upload is not an image .Please upload image"
        )
      );
    }

    const maxSize = 2 * 1024 * 1024;
    if (appLogoImage.size > maxSize) {
      return next(new BadRequestError("Please upload image smaller than 2MB"));
    }

    /***construct the folder (uploads) where we want to upload the image***/
    // const uploadsDir = path.join(
    //   __dirname,
    //   "..",
    //   "..",
    //   "..",
    //   "..",
    //   "client",
    //   "public",
    //   "uploads"
    // );

    // // check if it exists if not create uploads folder
    // if (!fs.existsSync(uploadsDir)) {
    //   fs.mkdirSync(uploadsDir, { recursive: true });
    // }

    // // Form a uniques name for the image
    // const uniqueLogo =
    //   appLogoImage.name.split(".")[0] +
    //   appLogoImage.md5 +
    //   "." +
    //   appLogoImage.name.split(".")[1];

    // //image path
    // const imagePath = path.join(uploadsDir, uniqueLogo);
    // await appLogoImage.mv(imagePath);

    /*****Moved to Cloud upload */
    const displayName = `${appname}-${crypto.randomBytes(8).toString("hex")}`;
    const result = await cloudinary.uploader.upload(appLogoImage.tempFilePath, {
      use_filename: true,
      folder: "lasppan-folder",
      public_id: displayName,
    });
    await appSettingsServices({
      appname,
      appname_acronym,
      paymentapi,
      whatsappapi,
      sendgridapi,
      applogo: result.secure_url,
      welfare_fee: parsedWelfare,
      lifetime_fee: parsedeLifetimeFee,
      annual_fee: parsedAnnualFee,
      secretaries: parsedSecretaries,
    });
    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "App settings updated successfully!" });
  } catch (error) {
    console.log(error);
  }
}

/** GET APP SETTINGS- Retrives application settings so it can be resdered in the UI **/
async function getAppSettingsController(req, res, next) {
  console.log(req?.user);
  try {
    const appDetails = await getAppSettingsServices();

    res.status(StatusCodes.OK).json({ ok: true, appDetails });
  } catch (error) {
    return next(error);
  }
}
module.exports = { appSettingsController, getAppSettingsController };
