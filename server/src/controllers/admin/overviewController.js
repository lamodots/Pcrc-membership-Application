const { getOverviewStats } = require("../../services");

const getOverview = async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  try {
    const stats = await getOverviewStats(year);
    console.log(stats);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getOverview,
};
