const errorHandlerMiddleware = require("./errorHandlerMiddleware");
const notfoundHandlerMiddleware = require("./notfoundHandlerMiddleware");
const {
  authenticateUser,
  authorizaPermissions,
} = require("./adminAuthMiddleware");

module.exports = {
  errorHandlerMiddleware,
  notfoundHandlerMiddleware,
  authenticateUser,
  authorizaPermissions,
};
