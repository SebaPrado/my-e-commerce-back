const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Admin = require("../models/Admin");

async function validateUser(req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      console.log("Username does not exist.");
      return res.json({ msg: "Incorrect credentials. Please try again.", constraint: true });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      console.log("Invalid password.");
      return res.json({ msg: "Incorrect credentials. Please try again.", constraint: true });
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);

    return res.json({
      token: token,
      userFirstname: user.firstname,
    });
  } catch (err) {
    console.log(err);
  }
}

async function validateAdmin(req, res) {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.email } });

    if (!admin) {
      console.log("Admin does not exist.");
      return res.json({ msg: "Incorrect credentials. Please try again.", constraint: true });
    }

    const match = await bcrypt.compare(req.body.password, admin.password);

    if (!match) {
      console.log("Invalid password.");
      return res.json({ msg: "Incorrect credentials. Please try again.", constraint: true });
    }

    const token = jwt.sign({ sub: admin.id }, process.env.JWT_SECRET);

    return res.json({
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  validateUser,
  validateAdmin,
};
