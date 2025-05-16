const adminAuthRoutes = require("./admin/adminAuthRoutes");
const adminUserRoute = require("./admin/userRoutes");
const appSettingsRoutes = require("./admin/appSettingsRoutes");
const announcementsRoutes = require("./admin/announcementsRoutes");
const subscriptionsRoutes = require("./admin/subscriptionsRoutes");
const eventRoutes = require("./admin/eventRoutes");
const eventApplicantRoute = require("./admin/eventApplicantRoutes");
const usersRoutes = require("./shared/userRoutes");
const usersAuthRoutes = require("./userAuth");
const userDuesRoutes = require("./userDues");
const overviewRoutes = require("./admin/overviewRoutes");
const memberRegisterRoutes = require("./admin/adminMemberRegisterRoutes");
const userProfileRoute = require("./userProfile");

module.exports = {
  adminAuthRoutes,
  adminUserRoute,
  appSettingsRoutes,
  announcementsRoutes,
  subscriptionsRoutes,
  eventRoutes,
  eventApplicantRoute,
  usersRoutes,
  usersAuthRoutes,
  userDuesRoutes,
  overviewRoutes,
  memberRegisterRoutes,
  userProfileRoute,
};
