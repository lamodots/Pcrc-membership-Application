const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    title: String,

    startDate: {
      type: Date,
      //   required: true,
    },
    endDate: {
      type: Date,
      //   required: true,
    },
    photoImage: String,
    time: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 400,
    },
    duration: String,
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicants",
      },
    ],

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      //   required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", eventsSchema);
