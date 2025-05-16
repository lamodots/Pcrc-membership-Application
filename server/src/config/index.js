const db = require("./dbconnect");
const {
  sendEmailSendGridServices,
  sendEmailNodemailerServices,
} = require("./email");

module.exports = { db, sendEmailSendGridServices, sendEmailNodemailerServices };
