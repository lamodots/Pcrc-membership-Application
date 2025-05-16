const {
  addAdminUserService,
  loginAdminServices,
} = require("./admin/adminAuthServices");
const {
  appSettingsServices,
  getAppSettingsServices,
} = require("./admin/appSettingsServices");

const {
  createAnnouncmentsService,
  getAllAnnouncmentsService,
  getSingleAnnouncmentService,
  editAnnouncmentService,
  deletAnnouncmentService,
} = require("./admin/announcementServices");

const {
  createSubscriptionServices,
  getAllSubscriptionServices,
  getSingleSubscriptionServices,
  editSubscriptionServices,
  deleteSubscriptionServices,
  verifyPaymentServices,
} = require("./admin/subscriptionServices");

const {
  createEventService,
  getAllEventService,
  getSingleEventService,
  editEventService,
  deletEventService,
} = require("./admin/eventServices");

const {
  createApplicantService,
  approveApplicantService,
  getApplicantsByEventService,
  getApplicantService,
} = require("./admin/eventApplicantService");

const getUserDetailsService = require("./admin/userServices");
const getUserSubscriptionServices = require("./admin/userSubscriptionServices");

const getAllUsersService = require("./usersServices");
const {
  registerUserService,
  verifyEmailService,
  userLoginService,
  forgotUserPasswordService,
  resetUserPasswordService,
  completeOnboardingService,
  userProfileServices,
  updateUserProfileServices,
} = require("./usersServices");

const {
  approveMembershipWelfareDuesServices,
  approveMembershipDuesServices,
  getAPersonWelfarePaymentsServices,
  getAPersonMembershipPaymentsServices,
  fetchAllMembershipPaymentsService,
  fetchAllWelfarePaymentsService,
  fetchMemberDuesAndWelfareDuesServices,
} = require("./userDuesServices");

const fetchPaystackTransactionsServices = require("./paystackTransactionServices");
const { getOverviewStats } = require("./admin/overviewServices");

module.exports = {
  addAdminUserService,
  loginAdminServices,
  appSettingsServices,
  getAppSettingsServices,
  createAnnouncmentsService,
  getAllAnnouncmentsService,
  getSingleAnnouncmentService,
  editAnnouncmentService,
  deletAnnouncmentService,
  createSubscriptionServices,
  getAllSubscriptionServices,
  getSingleSubscriptionServices,
  editSubscriptionServices,
  deleteSubscriptionServices,
  createEventService,
  getAllEventService,
  getSingleEventService,
  editEventService,
  deletEventService,
  createApplicantService,
  approveApplicantService,
  getApplicantsByEventService,
  verifyPaymentServices,
  getUserDetailsService,
  getUserSubscriptionServices,
  getApplicantService,
  registerUserService,
  verifyEmailService,
  userLoginService,
  userProfileServices,
  updateUserProfileServices,
  forgotUserPasswordService,
  resetUserPasswordService,
  completeOnboardingService,
  approveMembershipWelfareDuesServices,
  approveMembershipDuesServices,
  getAPersonWelfarePaymentsServices,
  getAPersonMembershipPaymentsServices,
  fetchAllMembershipPaymentsService,
  fetchAllWelfarePaymentsService,
  fetchMemberDuesAndWelfareDuesServices,
  fetchPaystackTransactionsServices,
  getOverviewStats,
};
