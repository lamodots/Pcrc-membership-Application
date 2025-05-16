const { StatusCodes } = require("http-status-codes");
const {
  approveMembershipWelfareDuesServices,
  approveMembershipDuesServices,
  getAPersonWelfarePaymentsServices,
  getAPersonMembershipPaymentsServices,
  GetAllDuesService,
  fetchAllMembershipPaymentsService,
  fetchAllWelfarePaymentsService,
  fetchMemberDuesAndWelfareDuesServices,
} = require("../services");
const { BadRequestError } = require("../errors");
const { MembershipDues, WelfareDues } = require("../models");

const approveMembershipWelfareDues = async (req, res) => {
  const {
    userId,
    userEmail,
    first_name,
    last_name,
    isWelfareDuePaid,
    paymentMethod,
    channel,
    account_name,
    bank,
  } = req.body;

  console.log(req.body);

  const result = await approveMembershipWelfareDuesServices(
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
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "Membership Welfare Dues paid sucessfully", result });

  try {
  } catch (error) {
    // Map generic errors to HTTP-specific errors
    if (error.message === "No approval parameters") {
      return next(new BadRequestError("Provide user ID"));
    }
    if (error.message === "ID dose not exist") {
      return next(new BadRequestError("Provide user ID"));
    }
    if (error.message === "User does not exist") {
      return next(new BadRequestError("User does not exist!"));
    }
    next(error);
  }
};

const approveMembershipDues = async (req, res) => {
  const {
    userId,
    email,
    isMemberShipDuePaid,
    paymentMethod,
    channel,
    account_name,
    bank,
  } = req.body;

  const result = await approveMembershipDuesServices(
    userId,
    email,
    isMemberShipDuePaid,
    paymentMethod,
    paymentReference,
    channel,
    account_name,
    bank
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "Membership  Dues paid sucessfully", result });

  try {
  } catch (error) {
    // Map generic errors to HTTP-specific errors
    if (error.message === "No approval parameters") {
      return next(new BadRequestError("Provide user ID"));
    }
    if (error.message === "ID dose not exist") {
      return next(new BadRequestError("Provide user ID"));
    }
    if (error.message === "User does not exist") {
      return next(new BadRequestError("User does not exist!"));
    }
    next(error);
  }
};

const getAPersonWelfarePayments = async (req, res, next) => {
  const userId = req.user?.userId;
  try {
    const userWelfareDues = await getAPersonWelfarePaymentsServices(userId);
    res.status(StatusCodes.OK).json({ success: true, userWelfareDues });
  } catch (error) {
    // Map generic errors to HTTP-specific errors
    if (error.message === "Error retriving user welfare dues") {
      return next(new BadRequestError("Failed to retrive Welfare Dues"));
    }

    next(error);
  }
};
const getAPersonMembershipPayments = async (req, res) => {
  const userId = req.user?.userId;
  try {
    const userMembershipDues = await getAPersonMembershipPaymentsServices(
      userId
    );
    res.status(StatusCodes.OK).json({ success: true, userMembershipDues });
  } catch (error) {
    // Map generic errors to HTTP-specific errors
    if (error.message === "Error retriving user membership dues") {
      return next(new BadRequestError("Failed to retrive Membership Dues"));
    }

    next(error);
  }
};

// GET A USER DUES BY ID
const fetchMemberDuesAndWelfareDuesController = async (req, res, next) => {
  const userId = req.params.userId;
  console.log(req);
  try {
    const userSub = await fetchMemberDuesAndWelfareDuesServices(userId);
    console.log(userSub);
    if (!userSub) {
      return next(new BadRequestError("Failed to retrive Membership Dues"));
    }
    return res.status(StatusCodes.OK).json({ success: true, data: userSub });
  } catch (error) {
    if (
      error.message === "Error retrieving user membership dues and welfare dues"
    ) {
      return next(
        new BadRequestError(
          "Failed to retrive membership dues and welfare dues"
        )
      );
    }

    next(error);
  }
};

// Get all payments
const getAllMembershipPayments = async (req, res, next) => {
  const {
    paymentMethod,
    status,
    membershipType,
    year,
    page = 1,
    limit = 2,
  } = req.query;
  console.log(req.query);
  const filter = {};

  const allowedPaymentMethods = ["online", "offline"];
  if (paymentMethod && !allowedPaymentMethods.includes(paymentMethod)) {
    return res.status(400).json({ error: "Invalid payment method" });
  } else if (paymentMethod) {
    filter.paymentMethod = { $regex: paymentMethod, $options: "i" }; // Case-insensitive regex search
  }

  const allowedMembershipTypes = [
    "Corporate membership",
    "Annual membership",
    "Honorary",
  ];
  if (membershipType && !allowedMembershipTypes.includes(membershipType)) {
    return res.status(400).json({ error: "Invalid membership type" });
  } else if (membershipType) {
    filter.membershipType = {
      $regex: membershipType,
      $options: "i",
    }; // Case-insensitive regex search
  }
  const allowedStatus = ["active", "pending", "expired"];
  if (status && !allowedStatus.includes(status)) {
    return res.status(400).json({ error: "Invalid status type" });
  } else if (status) {
    filter.status = {
      $regex: status,
      $options: "i",
    }; // Case-insensitive regex search
  }
  if (year) {
    filter.year = year;
  }
  // include pagination
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);
  //make sure the page limit are numbers
  if (isNaN(parsedPage) || parsedPage < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid page. must be a positive integer",
    });
  }

  if (isNaN(parsedLimit) || parsedLimit < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid limit. must be a positive integer",
    });
  }
  // calculate how many doument should be skipped
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const allMembershipDues = await fetchAllMembershipPaymentsService(
      filter,
      skip,
      parsedLimit
    );

    // Include the total count in the response:
    const totalRecords = await MembershipDues.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / parsedLimit);
    res.status(StatusCodes.OK).json({
      success: true,
      data: allMembershipDues,
      pagination: {
        currentPage: parsedPage,
        totalPages,
        totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};
/**GET ALL WELFARE DUES WITH PAGINATION */
const getAllWelfarePayments = async (req, res, next) => {
  const { paymentMethod, year, page = 1, limit = 5 } = req.query;

  const filter = {};
  const allowedPaymentMethods = ["online", "offline"];
  if (paymentMethod && !allowedPaymentMethods.includes(paymentMethod)) {
    return res.status(400).json({ error: "Invalid payment method" });
  } else if (paymentMethod) {
    filter.paymentMethod = { $regex: paymentMethod, $options: "i" };
  }
  if (year) {
    filter.year = year;
  }

  // include pagination
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  // make  sure the page limts are numbers
  if (isNaN(parsedPage) || parsedPage < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid page. must be positive interger",
    });
  }

  if (isNaN(parsedLimit) || parsedLimit < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid limit. must be a posotive integer",
    });
  }

  // construct the skill which is how many document should be skipped
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const allWelfarepDues = await fetchAllWelfarePaymentsService(
      filter,
      skip,
      parsedLimit
    );

    // include the total coun in th respose
    const totalRecords = await WelfareDues.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / parsedLimit);
    res.status(StatusCodes.OK).json({
      success: true,
      data: allWelfarepDues,
      pagination: {
        currentPage: parsedPage,
        totalPages,
        totalRecords,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  approveMembershipDues,
  approveMembershipWelfareDues,
  getAPersonWelfarePayments,
  getAPersonMembershipPayments,
  getAllMembershipPayments,
  getAllWelfarePayments,
  fetchMemberDuesAndWelfareDuesController,
};
