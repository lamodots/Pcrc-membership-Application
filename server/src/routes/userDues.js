const express = require("express");

const { authenticateUser, authorizaPermissions } = require("../middlewares");
const {
  approveMembershipWelfareDues,
  approveMembershipDues,
  getAPersonMembershipPayments,
  getAPersonWelfarePayments,
  getAllMembershipPayments,
  getAllWelfarePayments,
  fetchMemberDuesAndWelfareDuesController,
  fetchPaystackTransactionsController,
} = require("../controllers");

const membershipDuesRoute = express.Router();

// membershipDuesRoute.post(
//   "/welfare",
//   authenticateUser,
//   approveMembershipWelfareDues
// );
membershipDuesRoute.get(
  "/welfare",
  authenticateUser,
  getAPersonWelfarePayments
);
// membershipDuesRoute.post(
//   "/membership-dues",
//   authenticateUser,
//   approveMembershipDues
// );
membershipDuesRoute.get(
  "/membership-dues",
  authenticateUser,
  getAPersonMembershipPayments
);
membershipDuesRoute.get(
  "/membership-payments",
  authenticateUser,
  authorizaPermissions("admin", "moderator"),
  getAllMembershipPayments
);
membershipDuesRoute.get(
  "/welfare-payments",
  authenticateUser,
  authorizaPermissions("admin", "moderator"),
  getAllWelfarePayments
);

membershipDuesRoute.get(
  "/paystack-transactions",
  authenticateUser,
  authorizaPermissions("admin", "moderator"),
  fetchPaystackTransactionsController
);
membershipDuesRoute.get(
  "/:userId",
  authenticateUser,
  fetchMemberDuesAndWelfareDuesController
);

module.exports = membershipDuesRoute;
