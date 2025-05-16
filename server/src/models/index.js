const AppSettingModel = require("./admin/appSettingsModel");
const AnnouncementModel = require("./admin/annoucementModel");
const User = require("./usersModel");
const SubscriptionModel = require("./admin/subscriptionModel");
const EventsModel = require("./admin/eventsModel");
const UserSubscriptionModel = require("./UserSubscription");
const Applicants = require("./admin/eventApplicantModel");
const WelfareDues = require("./userWelfareModel");
const MembershipDues = require("./userMembershipDuesModel");
module.exports = {
  AppSettingModel,
  AnnouncementModel,
  User,
  SubscriptionModel,
  EventsModel,
  UserSubscriptionModel,
  Applicants,
  WelfareDues,
  MembershipDues,
};
