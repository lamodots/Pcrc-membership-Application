function calculateExpiryDate(interval) {
  const startDate = new Date();
  switch (interval) {
    case "daily":
      return new Date(startDate.setDate(startDate.getDate() + 1));
    case "monthly":
      return new Date(startDate.setMonth(startDate.getMonth() + 1));
    case "quarterly":
      return new Date(startDate.setMonth(startDate.getMonth() + 3));
    case "yearly":
      return new Date(startDate.setFullYear(startDate.getFullYear() + 1));
    default:
      return startDate;
  }
}

module.exports = calculateExpiryDate;
