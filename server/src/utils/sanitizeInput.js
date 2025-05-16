const sanitizeInput = (data) => {
  return Object.keys(data).reduce((acc, key) => {
    if (key === "familyInLagos") {
      // Convert "true" or "false" strings to boolean
      acc[key] = data[key] === "true";
    } else if (typeof data[key] === "string") {
      acc[key] = data[key].trim(); // Trim strings to remove whitespace
    } else if (Array.isArray(data[key])) {
      acc[key] = data[key].map((item) =>
        typeof item === "string" ? item.trim() : item
      );
    } else {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};

module.exports = sanitizeInput;
