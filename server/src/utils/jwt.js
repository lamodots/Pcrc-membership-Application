const jwt = require("jsonwebtoken");

// Generate access and refresh tokens
function createJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
    // expiresIn: "120000",
  });

  return token;
}

function isTokenValid(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function attachCookiesToResponse(res, user) {
  // Generate access and refresh tokens
  const token = createJWT({ payload: user });

  // const oneDay = 1000 * 60 * 60 * 24;
  const oneDay = 1000 * 60 * 60 * 24;

  // Determine if we're in a cross-site context
  const isSecure =
    process.env.NODE_ENV === "production" ||
    process.env.FORCE_SECURE === "true";
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: isSecure,
    signed: true,
    sameSite: isSecure ? "None" : "Lax",
    path: "/",
    // sameSite: "Strict", // use locally
  });
}

/**PROD */
// function attachCookiesToResponse(res, user) {
//   const token = createJWT({ payload: user });
//   const oneDay = 1000 * 60 * 60 * 24;
//   const isProduction = process.env.NODE_ENV === "production";
//   // For cross-domain cookies in production, sameSite must be 'None' and secure must be true
//   res.cookie("token", token, {
//     httpOnly: true,
//     maxAge: oneDay,
//     secure: isProduction, // Use secure only in production
//     signed: true,
//     sameSite: isProduction ? "None" : "Lax", // Use "Lax" in development
//     path: "/", // Make available on all paths
//     // Don't set domain - let the browser handle it based on the responder
//   });
// }
module.exports = {
  createJWT,
  attachCookiesToResponse,
  isTokenValid,
};
