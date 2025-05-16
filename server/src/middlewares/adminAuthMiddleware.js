const isTokenValid = require("../utils/jwt");
const CustomError = require("../errors");

function authenticateUser(req, res, next) {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnAuthenticatedError("Authentication Invalid");
  }

  try {
    const decoded = isTokenValid.isTokenValid(token);

    req.user = decoded.payload;

    next();
  } catch (error) {
    throw new CustomError.UnAuthenticatedError(
      "Something went wrong:Authentication Invalid"
    );
  }
}

function authorizaPermissions(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        " Unauthorized to access this route"
      );
    }
    next();
  };
}

module.exports = { authenticateUser, authorizaPermissions };
