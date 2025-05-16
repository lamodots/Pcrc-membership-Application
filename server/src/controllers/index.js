const {
  createAnnouncment,
  getAllAnnoucements,
  getSingleAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
} = require("./admin/announcementController");
const {
  createSubscriptions,
  getAllSubscriptions,
  getSingleSubscriptions,
  deleteSubscriptions,
  editSubscriptions,
  verifyPayment,
} = require("./admin/subscriptionsController");
const {
  addAdminController,
  loginAdminController,
  logOutController,
  currentUserController,
} = require("./admin/adminAuthController");
const {
  appSettingsController,
  getAppSettingsController,
} = require("./admin/appSettingsController");

const {
  createEvents,
  getAllEvents,
  getSingleEvent,
  editEvent,
  deleteEvent,
} = require("./admin/eventController");

const {
  createApplicant,
  getApplicantsByEvent,
  approveApplicant,
  getApplicantByEvent,
} = require("./admin/eventApplicantController");

const getUserProfileDetails = require("./admin/userController");
const {
  registerUserController,
  verifyEmailController,
  resetUserPasswordController,
  loginUserController,
  resendVerificationEmailController,
  logOutUserController,
  forgotUserPasswordController,
  completeOnboarding,
} = require("./userAuthController");

const {
  approveMembershipDues,
  approveMembershipWelfareDues,
  getAPersonMembershipPayments,
  getAPersonWelfarePayments,
  getAllMembershipPayments,
  getAllWelfarePayments,
  fetchMemberDuesAndWelfareDuesController,
} = require("./userDuesController");

const fetchPaystackTransactionsController = require("./paystactTransactionController");
const { getOverview } = require("./admin/overviewController");
const {
  userProfileController,
  updateUserProfileController,
} = require("./userProfileController");
module.exports = {
  createAnnouncment,
  getAllAnnoucements,
  getSingleAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  addAdminController,
  loginAdminController,
  resendVerificationEmailController,
  currentUserController,
  logOutController,
  appSettingsController,
  getAppSettingsController,
  createSubscriptions,
  getAllSubscriptions,
  getSingleSubscriptions,
  deleteSubscriptions,
  editSubscriptions,
  createEvents,
  getAllEvents,
  getSingleEvent,
  editEvent,
  deleteEvent,
  verifyPayment,
  getUserProfileDetails,
  createApplicant,
  getApplicantsByEvent,
  approveApplicant,
  getApplicantByEvent,
  registerUserController,
  resetUserPasswordController,
  loginUserController,
  userProfileController,
  updateUserProfileController,
  forgotUserPasswordController,
  logOutUserController,
  verifyEmailController,
  completeOnboarding,
  approveMembershipWelfareDues,
  approveMembershipDues,
  getAPersonMembershipPayments,
  getAPersonWelfarePayments,
  getAllMembershipPayments,
  getAllWelfarePayments,
  fetchMemberDuesAndWelfareDuesController,
  fetchPaystackTransactionsController,
  getOverview,
};
