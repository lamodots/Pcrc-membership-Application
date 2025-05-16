const getExpiryDate = (membershipType) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  if (membershipType === "Life membership") {
    return new Date(currentYear + 100, 1, 28); // 100 years later
  } else {
    return new Date(currentYear + 1, 1, 28); // 1 year later
  }
};

module.exports = getExpiryDate;
