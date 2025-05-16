// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// const uploadImageToCloudinary = async (file, folderName) => {
//   try {
//     // Validate file type
//     if (!file.mimetype.startsWith("image")) {
//       throw new BadRequestError("Please upload an image file");
//     }

//     // Validate file size (5MB limit)
//     const maxSize = 5 * 1024 * 1024; // 5MB
//     if (file.size > maxSize) {
//       throw new BadRequestError("Image must be smaller than 5MB");
//     }

//     // Generate a dynamic filename
//     const dynamicFilename = `${file.name.replace(/\s+/g, "_")}-${crypto
//       .randomBytes(8)
//       .toString("hex")}`;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       use_filename: true,
//       folder: folderName,
//       public_id: dynamicFilename,
//     });

//     console.log("URL URLK", result.secure_url);
//     // Delete temporary file
//     fs.unlinkSync(file.tempFilePath);
//     return result.secure_url;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = uploadImageToCloudinary;
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const crypto = require("crypto");

const uploadImageToCloudinary = async (file, folderName) => {
  let dynamicFilename;
  try {
    // Validate file type
    if (!file.mimetype.startsWith("image")) {
      throw new BadRequestError("Please upload an image file");
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestError("Image must be smaller than 5MB");
    }

    // Generate a dynamic filename

    dynamicFilename = `${file.name.replace(/\s+/g, "_")}-${crypto
      .randomBytes(8)
      .toString("hex")}`;
    // Upload to Cloudinary using tempFilePath
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      use_filename: true,
      folder: folderName,
      public_id: dynamicFilename,
    });

    // Delete temporary file
    fs.unlinkSync(file.tempFilePath);
    return result.secure_url;
  } catch (error) {
    throw error;
  }
};

module.exports = uploadImageToCloudinary;
