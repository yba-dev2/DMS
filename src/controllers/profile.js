const { User } = require("../config/dbConnector");

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.render("profile.ejs", { user });
  } catch (error) {
    console.error("Profile loading error:", error.message);
    return res.status(500).send("Unable to load profile");
  }
};

module.exports = { getProfile };
