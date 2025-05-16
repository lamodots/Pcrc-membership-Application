const express = require("express");
const {
  getAllUsers,
  exportUsersController,
} = require("../../controllers/admin/adminMemberRegister");

const memberRegisterRoutes = express.Router();

memberRegisterRoutes.get("/member-register", getAllUsers);
memberRegisterRoutes.get("/download", exportUsersController);

module.exports = memberRegisterRoutes;
