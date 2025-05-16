const { BadRequestError } = require("../../errors");
const { AnnouncementModel } = require("../../models");

async function createAnnouncmentsService(body) {
  const announcement = new AnnouncementModel(body);

  await announcement.save();

  return announcement;
}
async function getAllAnnouncmentsService() {
  try {
    const announcements = await AnnouncementModel.find({})
      .populate({
        path: "createdBy",
        select: "firstname lastname -_id",
      })
      .sort({ createdAt: "desc" });

    return announcements;
  } catch (error) {
    throw new Error("Failed to fetch announcements. Please try again later.");
  }
}
async function getSingleAnnouncmentService(id) {
  try {
    const announcement = await AnnouncementModel.findById(id);
    if (!announcement) {
      throw new BadRequestError(`Announcement with ${id} does not exist`);
    }
    return announcement;
  } catch (error) {
    throw error;
  }
}
async function editAnnouncmentService(id, body) {
  try {
    const announcement = await AnnouncementModel.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!announcement) {
      throw new BadRequestError(
        ` Failed to edit Announcement with ${id} try again`
      );
    }
    return announcement;
  } catch (error) {
    throw error;
  }
}
async function deletAnnouncmentService(id) {
  try {
    const announcement = await AnnouncementModel.findByIdAndDelete(id);
    if (!announcement) {
      throw new BadRequestError(`Announcement with ${id} does not exist`);
    }
    return announcement;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAnnouncmentsService,
  getAllAnnouncmentsService,
  getSingleAnnouncmentService,
  editAnnouncmentService,
  deletAnnouncmentService,
};
