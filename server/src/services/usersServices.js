const { sendEmailSendGridServices } = require("../config");
const { BadRequestError } = require("../errors");
// const { sanitizeInput } = require("../utils/sanitizeInput");

const { User } = require("../models");
const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const {
  createTokenUser,
  sendResetPassswordEmailTemplate,
  uploadImageToCloudinary,
} = require("../utils");
const generateMembershipID = require("../utils/generateUniqueMembershipId");
const sanitizeInput = require("../utils/sanitizeInput");

async function getAllUsersService() {
  const users = await User.find({ role: "user", isVerified: true })
    .select("-password")
    .populate({
      path: "userSubscription",
      populate: {
        path: "planId",
        model: "SubscriptionPlan",
        select: "name interval amount",
      },
    })
    .sort({ createdAt: -1 });
  return users;
}

async function registerUserService(body) {
  try {
    const emailAlreadyExist = await User.findOne({ email: body.email });
    // check if user already exist
    if (emailAlreadyExist) {
      throw new BadRequestError("Email Already Exist");
    }

    const user = await User(body);
    await user.save();
    return user;
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new BadRequestError(error.message);
    } else {
      throw error;
    }
  }
}

const verifyEmailService = async (email, token) => {
  console.log("TOKEN CHECKservices", email, token);
  // Make sure token and email is not empty
  // Retrive token from database
  // // compare verificationToken with token
  // if they are equal, update isVeried to true and vefired to actuall date it was vefied

  // checks if email and token is available
  if (!email || !token) {
    throw new Error("No verification parameters");
  }
  const user = await User.findOne({ email });
  console.log(user);
  // Check if user exist
  if (!user) {
    throw new Error("Verification failed!");
  }

  if (user.verificationToken !== token) {
    throw new Error("Invalid verification token");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();

  return { ok: true, message: "Email verified successfully" };
};

// Onboarding Service logic

const completeOnboardingService = async (email, userData) => {
  const sanitizedData = sanitizeInput(userData);
  console.log("Sanitized Data:", sanitizedData);

  // Validate step one data
  if (
    !sanitizedData.firstname ||
    !sanitizedData.lastname ||
    !sanitizedData.title ||
    !sanitizedData.dob ||
    !sanitizedData.studio_name ||
    !sanitizedData.gender ||
    !sanitizedData.state ||
    !sanitizedData.zone ||
    !sanitizedData.address ||
    !sanitizedData.whatsappId
  ) {
    throw new Error("Please provide all required step one data.");
  }

  // Process the user data (e.g., save to database)
  try {
    const membershipID = generateMembershipID();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { ...sanitizedData, memberId: membershipID, isOnboarded: true },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      throw new Error("User not found.");
    }
    // updatedUser.isOnboarded = true;
    // await updatedUser.save();
    return updatedUser;
  } catch (error) {
    throw new Error("Error completing onboarding process: " + error.message);
  }
};

const userLoginService = async (email, password) => {
  // check  if fields are empty
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  // check if the user exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  // check if registered user password matches the submitted password  and //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  // check if user is veried
  if (!user.isVerified) {
    throw new Error("Please verify your email !");
  }
  // create tokenUser (part of the user ) used as payload
  // Helper function to create the token user payload

  const tokenUser = createTokenUser(user);

  return tokenUser;
};

const userProfileServices = async (userId, options = { lean: true }) => {
  try {
    const query = User.findById({ _id: userId }).select({
      password: 0,
      __v: 0,
    });

    if (options.lean) {
      query.lean();
    }
    const profile = await query;
    if (!profile) {
      throw new Error("User not found or invalid request");
    }

    return profile;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user profile");
  }
};

const updateUserProfileServices = async (userId, userData, uploadedFiles) => {
  try {
    // Step 1: Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Step 2: Handle password update
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      delete userData.confirmPassword; // Remove confirmPassword field
    } else {
      delete userData.password; // Avoid overwriting with empty value
    }

    // Step 3: Handle main profile image upload
    if (uploadedFiles.image) {
      userData.image = await uploadImageToCloudinary(
        uploadedFiles.image,
        "lasppan-folder/profile"
      );
    }

    // Step 4: Parse family members data
    // if (userData.familyMembers && typeof userData.familyMembers === "string") {
    //   try {
    //     userData.familyMembers = JSON.parse(userData.familyMembers);
    //   } catch (error) {
    //     throw new BadRequestError("Invalid family members data format");
    //   }
    // }

    // Step 5: Handle family member image uploads
    // if (userData.familyMembers && Array.isArray(userData.familyMembers)) {
    //   for (const key in uploadedFiles) {
    //     // Check if this is a family member image upload
    //     if (key.startsWith("familyMemberImage_")) {
    //       const index = parseInt(key.split("_")[1], 10);

    //       // Make sure this index exists in the family members array
    //       if (userData.familyMembers[index]) {
    //         // Upload to Cloudinary
    //         const imageUrl = await uploadImageToCloudinary(
    //           uploadedFiles[key],
    //           "lasppan-folder/family-members"
    //         );

    //         // Update the family member's image URL
    //         userData.familyMembers[index].image = imageUrl;
    //       }
    //     }
    //   }
    // }

    // Step 6: Update user document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true, runValidators: true }
    ).select("-password");

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const forgotUserPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email does not exist or invalid request");
  }

  const passwordToken = crypto.randomBytes(70).toString("hex");

  // Set token expiration (10 minutes from now)
  const tenMinutes = 1000 * 60 * 10;
  const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

  // Hash the token
  const hashedPassword = crypto
    .createHash("md5")
    .update(passwordToken)
    .digest("hex");

  // update the user values passwordToken and toen expiration
  user.passwordToken = hashedPassword;
  user.passwordTokenExpirationDate = passwordTokenExpirationDate;
  await user.save();
  return user;
};

const resetUserPasswordService = async (email, token, password) => {
  // const hashedPassword = crypto.createHash("md5").update(token).digest("hex");
  // console.log(hashedPassword);
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid reset request");
  }

  // Validate the token and expiration date
  const currentDate = new Date();
  if (
    user.passwordToken !== token ||
    user.passwordTokenExpirationDate < currentDate
  ) {
    throw new Error("Invalid or expired token");
  }
  // Update the user's password and clear token fields
  user.password = password;
  user.passwordToken = null;
  user.passwordTokenExpirationDate = null;
  await user.save();
};
module.exports = {
  getAllUsersService,
  registerUserService,
  verifyEmailService,
  userLoginService,
  forgotUserPasswordService,
  resetUserPasswordService,
  completeOnboardingService,
  userProfileServices,
  updateUserProfileServices,
};
