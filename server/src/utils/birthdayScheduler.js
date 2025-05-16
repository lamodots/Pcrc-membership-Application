const cron = require("node-cron");
const { processBirthdays } = require("../services/birthdayService");

// Schedule the birthday check to run daily at 8:00 AM
cron.schedule("0 8 * * *", () => {
  console.log("Running daily birthday check...");
  processBirthdays();
});

console.log("Birthday scheduler initialized.");
