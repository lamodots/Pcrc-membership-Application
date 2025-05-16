const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs").promises;

const acceptableFileTypes = ["jpeg", "jpg", "gif", "png"];

/**
 * Validates if the file has an acceptable extension
 * @param {Object} file - The file object to validate
 * @param {String} fileLabel - A label to identify the file in error messages
 */
function validateFileType(file, fileLabel) {
  const fileExtension = file.name.split(".")[1];

  if (!acceptableFileTypes.includes(fileExtension)) {
    throw new Error(`File type not acceptable in ${fileLabel}`);
  }
}

/**
 * Prepares filename by removing spaces and adding a unique identifier
 * @param {String} filename - The original filename
 * @returns {String} - The prepared filename
 */
function prepareFilename(filename) {
  // Replace spaces
  let cleanedFilename = filename;
  if (filename.includes(" ")) {
    cleanedFilename = filename.split(" ").join("");
  }

  // Add unique identifier
  return `${cleanedFilename}-${crypto.randomBytes(8).toString("hex")}`;
}

/**
 * Deletes a temporary file
 * @param {String} filePath - Path to the temporary file
 */
async function deleteTempFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`Successfully deleted temp file: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting temp file ${filePath}:`, error);
    // We don't throw here as this is cleanup and shouldn't fail the main operation
  }
}

/**
 * Uploads a file to Cloudinary and cleans up the temp file
 * @param {Object} file - The file to upload
 * @returns {String} - The secure URL of the uploaded file
 */
async function uploadToCloudinary(file) {
  const displayName = prepareFilename(file.name);

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      use_filename: true,
      folder: "ads-photo",
      public_id: displayName,
    });

    // Delete the temp file after successful upload
    await deleteTempFile(file.tempFilePath);

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    // Still try to clean up temp file even if upload failed
    await deleteTempFile(file.tempFilePath);
    throw new Error("Failed to upload file to cloud storage");
  }
}

module.exports = {
  validateFileType,
  prepareFilename,
  uploadToCloudinary,
  deleteTempFile,
};
