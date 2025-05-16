const { getAllUsersService } = require("../../services/usersServices");

async function getUsersController(req, res) {
  try {
    const users = await getAllUsersService();
    if (users && users.length === 0) {
      return res.status(200).json({ ok: true, message: "No user yet!" });
    }

    return res.status(200).json({ ok: true, users });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getUsersController };
