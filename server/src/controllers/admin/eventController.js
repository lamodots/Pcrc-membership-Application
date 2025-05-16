const path = require("path");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
const {
  createEventService,
  getAllEventService,
  getSingleEventService,
  deletEventService,
  editEventService,
} = require("../../services");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");

async function createEvents(req, res, next) {
  const { title, startDate, endDate, time, venue, description } = req.body;
  if (!title || !startDate || !endDate || !time || !venue || !description) {
    return next(new BadRequestError("All fileds are required"));
  }

  try {
    const eventImage = req.files.photoImage;
    if (!eventImage.mimetype.startsWith("image")) {
      return next(new BadRequestError("Please upload image"));
    }

    const maxSize = 5 * 1024 * 1024;

    if (eventImage.size > maxSize) {
      return next(new BadRequestError("Please upload image smaller than 5MB"));
    }

    // // construct the folder (uploads) where we want to upload the image
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

    // // Check if it exists if not create uploads folder
    // if (!fs.existsSync(uploadsDir)) {
    //   fs.mkdirSync(uploadsDir, { recursive: true });
    // }

    // const uniqueImage =
    //   eventImage.name.split(".")[0] +
    //   eventImage.md5 +
    //   "." +
    //   eventImage.name.split(".")[1];

    // const imagePath = path.join(uploadsDir, uniqueImage);

    // await eventImage.mv(imagePath);

    /***save image to cloud** */

    // Generate a dynamic filename

    const dynamicFilename = `${title.replace(/\s+/g, "_")}-${crypto
      .randomBytes(8)
      .toString("hex")}`;
    const result = await cloudinary.uploader.upload(eventImage.tempFilePath, {
      use_filename: true,
      folder: "lasppan-folder",
      public_id: dynamicFilename,
    });
    fs.unlinkSync(req.files.photoImage.tempFilePath);

    console.log(result);

    const event = await createEventService({
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      time: time,
      venue: venue,
      photoImage: result.secure_url,
      createdBy: req.user.userId,
    });

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "New Event Added",
      event,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return next(error.message);
  }
}

async function getAllEvents(req, res, next) {
  const event = await getAllEventService();

  if (event.length == []) {
    return res.status(StatusCodes.OK).json({ ok: true, message: "No Event" });
  }
  res.status(StatusCodes.OK).json({ ok: true, event });
}

async function getSingleEvent(req, res, next) {
  try {
    const { id } = req.params;
    console.log(typeof id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    const event = await getSingleEventService(id);

    res.status(StatusCodes.OK).json({ ok: true, event });
  } catch (error) {
    return next(error);
  }
}

async function editEvent(req, res, next) {
  const { id } = req.params;
  // const body = req.body;
  const { title, startDate, endDate, time, venue, description } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }

    const eventImage = req.files.photoImage;
    if (!eventImage.mimetype.startsWith("image")) {
      return next(new BadRequestError("Please upload image"));
    }

    const maxSize = 5 * 1024 * 1024;
    if (eventImage.size > maxSize) {
      return next(new BadRequestError("Please upload image smaller than 5MB"));
    }

    // construct the folder (uploads)
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

    // const uniqueImage =
    //   eventImage.name.split(".")[0] +
    //   eventImage.md5 +
    //   "." +
    //   eventImage.name.split(".")[1];

    // const imagePath = path.join(uploadsDir, uniqueImage);
    // await eventImage.mv(imagePath);

    // save to cloud
    const dynamicFilename = `${title.replace(/\s+/g, "_")}-${crypto
      .randomBytes(8)
      .toString("hex")}`;
    const result = await cloudinary.uploader.upload(
      req.files.photoImage.tempFilePath,
      {
        use_filename: true,
        folder: "lasppan-folder",
        public_id: dynamicFilename,
      }
    );
    fs.unlinkSync(req.files.photoImage.tempFilePath);

    const event = await editEventService(id, {
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      time: time,
      venue: venue,
      photoImage: result.secure_url,
      createdBy: req.user.userId,
    });

    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Event Edited", event });
  } catch (error) {
    return next(error);
  }
}
async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    console.log(typeof id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    await deletEventService(id);

    res.status(StatusCodes.OK).json({ ok: true, message: "Event Deleted" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createEvents,
  getAllEvents,
  getSingleEvent,
  editEvent,
  deleteEvent,
};
