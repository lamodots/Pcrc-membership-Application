// const User = require("../models/User");
// const MembershipDues = require("../models/UserMemberShip");
// const WelfareDues = require("../models/UserWelfare");

const { WelfareDues, MembershipDues, User } = require("../../models");

// const getOverviewStats = async () => {
//   // Calculate total revenue
//   const totalRevenue = await MembershipDues.aggregate([
//     { $match: { isMemberShipDuePaid: true } },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalWelfareRevenue = await WelfareDues.aggregate([
//     { $match: { isWelfareDuePaid: true } },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalRevenueAmount =
//     (totalRevenue[0]?.total || 0) + (totalWelfareRevenue[0]?.total || 0);

//   // Calculate membership dues paid
//   const totalMembershipDuesPaid = totalRevenue[0]?.total || 0;

//   // Calculate lifetime membership paid
//   const lifetimeMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: { isMemberShipDuePaid: true, membershipType: "Life membership" },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate annual membership paid
//   const annualMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: {
//         isMemberShipDuePaid: true,
//         membershipType: "Annual membership",
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate welfare dues paid
//   const welfareDuesPaid = totalWelfareRevenue[0]?.total || 0;

//   // Get number of male and female users
//   const maleUsers = await User.countDocuments({ sex: "male" });
//   const femaleUsers = await User.countDocuments({ sex: "female" });

//   return {
//     totalRevenue: totalRevenueAmount,
//     membershipDuesPaid: totalMembershipDuesPaid,
//     lifetimeMembershipPaid: lifetimeMembershipPaid[0]?.total || 0,
//     annualMembershipPaid: annualMembershipPaid[0]?.total || 0,
//     welfareDuesPaid: welfareDuesPaid,
//     maleUsers: maleUsers,
//     femaleUsers: femaleUsers,
//   };
// };

// module.exports = {
//   getOverviewStats,
// };

// //2nd
// const getOverviewStats = async (year) => {
//   const startDate = new Date(`${year}-01-01`);
//   const endDate = new Date(`${year}-12-31`);

//   // Calculate total revenue
//   const totalRevenue = await MembershipDues.aggregate([
//     {
//       $match: {
//         isMemberShipDuePaid: true,
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalWelfareRevenue = await WelfareDues.aggregate([
//     {
//       $match: {
//         isWelfareDuePaid: true,
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalRevenueAmount =
//     (totalRevenue[0]?.total || 0) + (totalWelfareRevenue[0]?.total || 0);

//   // Calculate membership dues paid
//   const totalMembershipDuesPaid = totalRevenue[0]?.total || 0;

//   // Calculate lifetime membership paid
//   const lifetimeMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: {
//         isMemberShipDuePaid: true,
//         membershipType: "Life membership",
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate annual membership paid
//   const annualMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: {
//         isMemberShipDuePaid: true,
//         membershipType: "Annual membership",
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate welfare dues paid
//   const welfareDuesPaid = totalWelfareRevenue[0]?.total || 0;

//   // Get number of male and female users
//   const maleUsers = await User.countDocuments({ sex: "Male" });
//   const femaleUsers = await User.countDocuments({ sex: "Female" });
//   const totalMembers = await User.countDocuments();

//   console.log("LIFE TIME", welfareDuesPaid);
//   console.log("ANNUAL", annualMembershipPaid);
//   return {
//     totalRevenue: totalRevenueAmount,
//     membershipDuesPaid: totalMembershipDuesPaid,
//     lifetimeMembershipPaid: lifetimeMembershipPaid[0]?.total || 0,
//     annualMembershipPaid: annualMembershipPaid[0]?.total || 0,
//     welfareDuesPaid: welfareDuesPaid,
//     maleUsers: maleUsers,
//     femaleUsers: femaleUsers,
//     totalMembers: totalMembers,
//   };
// };

// module.exports = {
//   getOverviewStats,
// };

// 3RD
// const getOverviewStats = async (year) => {
//   const startDate = new Date(`${year}-01-01`);
//   const endDate = new Date(`${year}-12-31`);

//   // Calculate total revenue from membership dues
//   const totalRevenue = await MembershipDues.aggregate([
//     {
//       $match: {
//         isMemberShipDuePaid: true,
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate total revenue from welfare dues
//   const totalWelfareRevenue = await WelfareDues.aggregate([
//     {
//       $match: {
//         isWelfareDuePaid: true,
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalRevenueAmount =
//     (totalRevenue[0]?.total || 0) + (totalWelfareRevenue[0]?.total || 0);

//   // Calculate membership dues paid
//   const totalMembershipDuesPaid = totalRevenue[0]?.total || 0;

//   // Calculate lifetime membership paid - FIXED (was using isMemberShipDuePaid)
//   const lifetimeMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: {
//         membershipType: "Life membership",
//         isMemberShipDuePaid: true,
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate annual membership paid - FIXED (was using isMemberShipDuePaid)
//   const annualMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: {
//         membershipType: "Annual membership",
//         isMemberShipDuePaid: true,
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate welfare dues paid
//   const welfareDuesPaid = totalWelfareRevenue[0]?.total || 0;

//   // Get number of male and female users - FIXED (using gender field instead of sex)
//   const maleUsers = await User.countDocuments({ gender: "Male" });
//   const femaleUsers = await User.countDocuments({ gender: "Female" });
//   const totalMembers = await User.countDocuments();

//   // Count total family members - FIXED
//   const familyMembersStats = await User.aggregate([
//     {
//       $project: {
//         familyMembersCount: { $size: { $ifNull: ["$familyMembers", []] } },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalFamilyMembers: { $sum: "$familyMembersCount" },
//       },
//     },
//   ]);

//   // Get total across all family members
//   const totalFamilyMembers = familyMembersStats[0]?.totalFamilyMembers || 0;

//   // Get total users including family members
//   const totalUsersWithFamily = totalMembers + totalFamilyMembers;

//   return {
//     totalRevenue: totalRevenueAmount,
//     membershipDuesPaid: totalMembershipDuesPaid,
//     lifetimeMembershipPaid: lifetimeMembershipPaid[0]?.total || 0,
//     annualMembershipPaid: annualMembershipPaid[0]?.total || 0,
//     welfareDuesPaid: welfareDuesPaid,
//     maleUsers: maleUsers,
//     femaleUsers: femaleUsers,
//     totalMembers: totalMembers,
//     totalFamilyMembers: totalFamilyMembers,
//     totalUsersWithFamily: totalUsersWithFamily,
//   };
// };

// module.exports = {
//   getOverviewStats,
// };

// 4
// const getOverviewStats = async (year) => {
//   const startDate = new Date(`${year}-01-01`);
//   const endDate = new Date(`${year}-12-31`);

//   // Calculate total revenue from membership dues
//   const totalRevenue = await MembershipDues.aggregate([
//     {
//       $match: {
//         isMemberShipDuePaid: true,
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate total revenue from welfare dues
//   const totalWelfareRevenue = await WelfareDues.aggregate([
//     {
//       $match: {
//         isWelfareDuePaid: true,
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalRevenueAmount =
//     (totalRevenue[0]?.total || 0) + (totalWelfareRevenue[0]?.total || 0);

//   // Calculate membership dues paid
//   const totalMembershipDuesPaid = totalRevenue[0]?.total || 0;

//   // Calculate lifetime membership paid
//   const lifetimeMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: {
//         membershipType: "Life membership",
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate annual membership paid
//   const annualMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: {
//         membershipType: "Annual membership",
//         paymentDate: { $gte: startDate, $lte: endDate },
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate welfare dues paid
//   const welfareDuesPaid = totalWelfareRevenue[0]?.total || 0;

//   // Get number of male and female users - FIXED (using gender field instead of sex)
//   const maleUsers = await User.countDocuments({ gender: "Male" });
//   const femaleUsers = await User.countDocuments({ gender: "Female" });
//   const totalMembers = await User.countDocuments();

//   // Count total family members - FIXED
//   const familyMembersStats = await User.aggregate([
//     {
//       $project: {
//         familyMembersCount: { $size: { $ifNull: ["$familyMembers", []] } },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalFamilyMembers: { $sum: "$familyMembersCount" },
//       },
//     },
//   ]);

//   // Get total across all family members
//   const totalFamilyMembers = familyMembersStats[0]?.totalFamilyMembers || 0;

//   // Get total users including family members
//   const totalUsersWithFamily = totalMembers + totalFamilyMembers;

//   return {
//     totalRevenue: totalRevenueAmount,
//     membershipDuesPaid: totalMembershipDuesPaid,
//     lifetimeMembershipPaid: lifetimeMembershipPaid[0]?.total || 0,
//     annualMembershipPaid: annualMembershipPaid[0]?.total || 0,
//     welfareDuesPaid: welfareDuesPaid,
//     maleUsers: maleUsers,
//     femaleUsers: femaleUsers,
//     totalMembers: totalMembers,
//     totalFamilyMembers: totalFamilyMembers,
//     totalUsersWithFamily: totalUsersWithFamily,
//   };
// };

// module.exports = {
//   getOverviewStats,
// };

//WORKING PERFECT EXCEPT CHART
const getOverviewStats = async (year) => {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  // Calculate total revenue from membership dues
  const totalRevenue = await MembershipDues.aggregate([
    {
      $match: {
        paymentDate: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  // Calculate total revenue from welfare dues
  const totalWelfareRevenue = await WelfareDues.aggregate([
    {
      $match: {
        paymentDate: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalRevenueAmount =
    (totalRevenue[0]?.total || 0) + (totalWelfareRevenue[0]?.total || 0);

  // Calculate membership dues paid - FIXED (removed isMemberShipDuePaid filter)
  const totalMembershipDuesPaid = totalRevenue[0]?.total || 0;

  // Calculate lifetime membership paid
  const lifetimeMembershipPaid = await MembershipDues.aggregate([
    {
      $match: {
        membershipType: "Corporate membership",
        paymentDate: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  // Calculate annual membership paid
  const annualMembershipPaid = await MembershipDues.aggregate([
    {
      $match: {
        membershipType: "Annual membership",
        paymentDate: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  // Calculate welfare dues paid - FIXED (removed isWelfareDuePaid filter)
  const welfareDuesPaid = totalWelfareRevenue[0]?.total || 0;

  // Get number of male and female users - FIXED (using gender field instead of sex)
  const maleUsers = await User.countDocuments({ gender: "Male" });
  const femaleUsers = await User.countDocuments({ gender: "Female" });
  const totalMembers = await User.countDocuments();

  // Count total family members - FIXED
  const familyMembersStats = await User.aggregate([
    {
      $project: {
        familyMembersCount: { $size: { $ifNull: ["$familyMembers", []] } },
      },
    },
    {
      $group: {
        _id: null,
        totalFamilyMembers: { $sum: "$familyMembersCount" },
      },
    },
  ]);

  // Get total across all family members
  const totalFamilyMembers = familyMembersStats[0]?.totalFamilyMembers || 0;

  // Get total users including family members
  const totalUsersWithFamily = totalMembers + totalFamilyMembers;

  return {
    totalRevenue: totalRevenueAmount,
    membershipDuesPaid: totalMembershipDuesPaid,
    lifetimeMembershipPaid: lifetimeMembershipPaid[0]?.total || 0,
    annualMembershipPaid: annualMembershipPaid[0]?.total || 0,
    welfareDuesPaid: welfareDuesPaid,
    maleUsers: maleUsers,
    femaleUsers: femaleUsers,
    totalMembers: totalMembers,
    totalFamilyMembers: totalFamilyMembers,
    totalUsersWithFamily: totalUsersWithFamily,
  };
};

module.exports = {
  getOverviewStats,
};
