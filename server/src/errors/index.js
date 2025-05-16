const CustomAPIError = require("./custom-error");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const UnAuthenticatedError = require("./unAuthenticated-error");
const UnauthorizedError = require("./unauthorized-error");

module.exports = {
  CustomAPIError,
  NotFoundError,
  BadRequestError,
  UnAuthenticatedError,
  UnauthorizedError,
};
