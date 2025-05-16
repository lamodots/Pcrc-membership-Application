// const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
/**
 * Generates a unique membership ID with the format KSN-XXXXXXXX
 * using UUID v4 for guaranteed uniqueness
 * @returns {string} A unique membership ID
 */

module.exports = function generateMembershipID() {
  const uuidShort = uuidv4().split("-")[0];
  const numericId = parseInt(uuidShort, 16) % 1000000; // Convert to base-10 number and limit to 6 digits
  return `LASPPAN-${numericId.toString().padStart(6, "0")}`;
};
