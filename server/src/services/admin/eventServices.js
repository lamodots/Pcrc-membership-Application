const { BadRequestError } = require("../../errors");
const { EventsModel } = require("../../models");

async function createEventService(body) {
  const event = new EventsModel(body);

  await event.save();

  return event;
}
async function getAllEventService() {
  try {
    const event = await EventsModel.find({}).populate({
      path: "createdBy",
      select: "firstname lastname -_id",
    });

    return event;
  } catch (error) {
    throw new Error("Failed to fetch Events. Please try again later.");
  }
}
async function getSingleEventService(id) {
  try {
    const event = await EventsModel.findById(id);
    if (!event) {
      throw new BadRequestError(`Event with ${id} does not exist`);
    }
    return event;
  } catch (error) {
    throw error;
  }
}
async function editEventService(id, body) {
  try {
    const event = await EventsModel.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!event) {
      throw new BadRequestError(` Failed to edit Event with ${id} try again`);
    }
    return event;
  } catch (error) {
    throw error;
  }
}
async function deletEventService(id) {
  try {
    const event = await EventsModel.findByIdAndDelete(id);
    if (!event) {
      throw new BadRequestError(`Event with ${id} does not exist`);
    }
    return event;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createEventService,
  getAllEventService,
  getSingleEventService,
  editEventService,
  deletEventService,
};
