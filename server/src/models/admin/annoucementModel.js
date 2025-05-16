const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      max: 400,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Annoucements", announcementSchema);
