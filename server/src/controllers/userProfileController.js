const { StatusCodes } = require("http-status-codes");
const {
  userProfileServices,
  updateUserProfileServices,
} = require("../services");

const userProfileController = async (req, res) => {
  try {
    const user = await userProfileServices(req.params.userId);
    res.status(200).json({ sucess: true, data: user });
  } catch (error) {
    console.log(error);
  }
};
// const updateUserProfileController = async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const userData = req.body;
//     const userImage = req.files?.image;

//     const updatedUser = await updateUserProfileServices(
//       userId,
//       userData,
//       userImage
//     );

//     res.status(StatusCodes.OK).json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     next(error); // Pass errors to the global error handler
//   }
// };
const updateUserProfileController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;

    // Handle uploaded files
    const uploadedFiles = {};

    // Extract main profile image if present
    if (req.files?.image) {
      uploadedFiles.image = req.files.image;
    }

    // Extract any family member images
    for (const key in req.files) {
      if (key.startsWith("familyMemberImage_")) {
        uploadedFiles[key] = req.files[key];
      }
    }

    const updatedUser = await updateUserProfileServices(
      userId,
      userData,
      uploadedFiles
    );

    res.status(StatusCodes.OK).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

module.exports = { userProfileController, updateUserProfileController };
