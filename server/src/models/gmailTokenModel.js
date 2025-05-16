const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  name: { type: String, default: "gmail" }, // For easy identification
  refresh_token: String,
});
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
