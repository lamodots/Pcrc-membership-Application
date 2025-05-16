const mongoose = require("mongoose");
const { WelfareDues, MembershipDues } = require("../models");

const approveMembershipWelfareDuesServices = async (
  userId,
  userEmail,
  first_name,
  last_name,
  isWelfareDuePaid,
  paymentMethod,
  paymentReference,
  channel,
  account_name,
  bank
) => {
  console.log(userId);
  if (!userId) {
    throw new Error("No approval parameters");
  }
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("ID dose not exist");
  }
  try {
    const isUser = await WelfareDues.find({ userId });
    if (!isUser) {
      throw new Error("User does not exist");
    }

    /*MARCH TO MARCH
    it should be even if a member pays for an annual membership a few days before March 1, the expiration date will be set to March 1 of the same year .
    else it should be set to March the following year
    */

    // const currentYear = new Date().getFullYear();
    // const currentDate = new Date();
    // const marchFirstThisYear = new Date(currentYear, 2, 1);

    // const isBeforeMarchFirst = currentDate < marchFirstThisYear;

    // const expiryDate = isBeforeMarchFirst
    //   ? marchFirstThisYear // March 1 of the same year
    //   : new Date(currentYear + 1, 2, 1); // March 1 of the next year
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const lastDayOfFebruaryThisYear = new Date(currentYear, 2, 0);

    const isBeforeFebuaryTwentyEight =
      currentDate < new Date(currentYear, 2, 1);

    const expiryDate = isBeforeFebuaryTwentyEight
      ? lastDayOfFebruaryThisYear // Last day of February of the same year
      : new Date(currentYear + 1, 2, 0); // Last day of February of the next year

    const duesInfo = {
      userId: userId,
      email: userEmail,
      full_name: `${first_name} ${last_name}`,
      startDate: currentDate,
      expiryDate: expiryDate,
      status: "active",
      isWelfareDuePaid: isWelfareDuePaid,
      paymentMethod: paymentMethod,
      paymentReference,
      channel,
      account_name,
      bank,
    };
    const userWelfareDues = await WelfareDues(duesInfo);
    userWelfareDues.save();
    return userWelfareDues;
  } catch (error) {
    throw new Error("Error creating welfare: " + error.message);
  }
};

/**MEMBERSHIP DUES SERVICES */
const approveMembershipDuesServices = async (
  userId,
  email,
  first_name,
  last_name,
  isMemberShipDuePaid,
  paymentMethod,
  paymentReference,
  channel,
  account_name,
  bank
) => {
  console.log(userId);
  if (!userId) {
    throw new Error("No approval parameters");
  }
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("ID dose not exist");
  }
  try {
    const isUser = await WelfareDues.find({ userId });
    if (!isUser) {
      throw new Error("User does not exist");
    }

    /*MARCH RO MARCH
    *it should be even if a member pays for an annual membership a few days before March 1, the expiration date will be set to March 1 of the same year .
    else it should be set to March the following year
    */

    // const currentYear = new Date().getFullYear();
    // const currentDate = new Date();
    // const marchFirstThisYear = new Date(currentYear, 2, 1);

    // const isBeforeMarchFirst = currentDate < marchFirstThisYear;

    // const expiryDate = isBeforeMarchFirst
    //   ? marchFirstThisYear // March 1 of the same year
    //   : new Date(currentYear + 1, 2, 1); // March 1 of the next year

    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const lastDayOfFebruaryThisYear = new Date(currentYear, 2, 0);

    const isBeforeFebuaryTwentyEight =
      currentDate < new Date(currentYear, 2, 1);

    const expiryDate = isBeforeFebuaryTwentyEight
      ? lastDayOfFebruaryThisYear // Last day of February of the same year
      : new Date(currentYear + 1, 2, 0); // Last day of February of the next year

    const duesInfo = {
      userId: userId,
      email,
      first_name,
      last_name,
      startDate: currentDate,
      expiryDate: expiryDate,
      status: "active",
      isMemberShipDuePaid: isMemberShipDuePaid,
      paymentReference: paymentReference,
      paymentMethod: paymentMethod,
      channel: channel,
      account_name: account_name,
      bank: bank,
    };
    const userMemberShipDues = await MembershipDues(duesInfo);
    userMemberShipDues.save();
    return userMemberShipDues;
  } catch (error) {
    throw new Error("Error creating welfare: " + error.message);
  }
};

const getAPersonWelfarePaymentsServices = async (userId) => {
  try {
    const userWelfares = await WelfareDues.find({ userId });

    return userWelfares;
  } catch (error) {
    throw new Error("Error retriving user welfare dues");
  }
};
const getAPersonMembershipPaymentsServices = async (userId) => {
  try {
    const userMemberShipDues = await MembershipDues.find({ userId });
    return userMemberShipDues;
  } catch (error) {
    throw new Error("Error retriving user membership dues");
  }
};

// // Get any users dues by id
const fetchMemberDuesAndWelfareDuesServices = async (userId) => {
  try {
    // Use Promise.all to fetch both datasets in parallel for efficiency
    const [userMembershipDues, userWelfares] = await Promise.all([
      MembershipDues.find({ userId, status: "active" })
        .select("status membershipType createdAt expiryDate")
        .sort({ createdAt: -1 }),

      WelfareDues.find({ userId, status: "active" })
        .select("status createdAt expiryDate")
        .sort({ createdAt: -1 }),
    ]);

    // Combine the results in a clear, consistent way
    const userSub = {
      membershipDues: userMembershipDues,
      welfareDues: userWelfares,
    };

    return userSub;
  } catch (error) {
    // Include original error details for easier debugging
    console.log(error.message);
    throw new Error(`Error retrieving user membership dues and welfare dues`);
  }
};
// Get any users dues by id with flattened result
// const fetchMemberDuesAndWelfareDuesServices = async (userId) => {
//   try {
//     // Use Promise.all to fetch both datasets in parallel for efficiency
//     // Add sort by createdAt in descending order (-1) to get latest first
//     const [userMembershipDues, userWelfares] = await Promise.all([
//       MembershipDues.find({ userId, status: "active" })
//         .select("status membershipType createdAt")
//         .sort({ createdAt: -1 }),
//       WelfareDues.find({ userId, status: "active" })
//         .select("status membershipType createdAt")
//         .sort({ createdAt: -1 }),
//     ]);

//     // Create a flattened array combining both types of dues
//     const flattenedDues = [
//       ...userMembershipDues.map((due) => ({
//         _id: due._id,
//         membershipType: due.membershipType || null,
//         status: due.status,
//         dueType: "membership",
//         createdAt: due.createdAt,
//       })),
//       ...userWelfares.map((welfare) => ({
//         _id: welfare._id,
//         membershipType: welfare.membershipType || null,
//         status: welfare.status,
//         dueType: "welfare",
//         createdAt: welfare.createdAt,
//       })),
//     ];

//     // If you want the entire combined list sorted by latest first
//     // Uncomment this line:
//     // flattenedDues.sort((a, b) => b.createdAt - a.createdAt);

//     return flattenedDues;
//   } catch (error) {
//     console.log(error.message);
//     throw new Error(`Error retrieving user membership dues and welfare dues`);
//   }
// };
// Fetch all Dues payments
const fetchPayments = async (Model, filter, skip, parsedLimit) => {
  try {
    return await Model.find(filter).skip(skip).limit(parsedLimit);
  } catch (error) {
    throw new Error(
      `Failed to retrieve ${Model.modelName.toLowerCase()} payments`
    );
  }
};
const fetchAllMembershipPaymentsService = (filter, skip, parsedLimit) => {
  return fetchPayments(MembershipDues, filter, skip, parsedLimit);
};

const fetchAllWelfarePaymentsService = (filter, skip, parsedLimit) => {
  console.log("WELFARE SERVICES");
  console.log(filter, parsedLimit, skip);
  return fetchPayments(WelfareDues, filter, skip, parsedLimit);
};

module.exports = {
  approveMembershipWelfareDuesServices,
  approveMembershipDuesServices,
  getAPersonWelfarePaymentsServices,
  getAPersonMembershipPaymentsServices,
  fetchAllMembershipPaymentsService,
  fetchAllWelfarePaymentsService,
  fetchMemberDuesAndWelfareDuesServices,
};
