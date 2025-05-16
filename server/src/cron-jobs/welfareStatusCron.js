const welfareCron = require("node-cron");

const { WelfareDues } = require("../models");

// Daily cron job at midnight (00:00)
welfareCron.schedule(
  "0 0 * * *",
  async () => {
    try {
      console.log("Running WelfareDues status check...");

      const currentDate = new Date();

      // Update expired memberships that are still marked as active/pending
      const result = await WelfareDues.updateMany(
        {
          expiryDate: { $lt: currentDate },
          status: { $in: ["active", "pending"] },
        },
        {
          $set: {
            status: "expired",
            isMemberShipDuePaid: false, // Optional: reset payment status
          },
        }
      );

      console.log(`Updated ${result.modifiedCount} expired memberships`);
    } catch (error) {
      console.error("Error updating membership statuses:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Africa/Lagos", // Set your server's timezone
  }
);

// Optional: Immediate test (uncomment for testing)
// (async () => {
//   await WelfareDues.updateMany(
//     { expiryDate: { $lt: new Date() }, status: { $in: ['active', 'pending'] } },
//     { $set: { status: 'expired', isMemberShipDuePaid: false } }
//   );
// })();
