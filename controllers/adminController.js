const { Admin } = require("../models");
const bcrypt = require("bcryptjs");

// GET ALL ADMINS
async function index(req, res) {
  try {
    const admins = await Admin.findAll();
    return res.json(admins);
  } catch (err) {
    console.log(err);
  }
}

// GET ONE ADMIN
async function show(req, res) {
  try {
    const admin = await Admin.findByPk(req.params.id);
    return admin
      ? res.json(admin)
      : res.json({ msg: "Error 404. Admin not found.", notFound: true });
  } catch (err) {
    console.log(err);
  }
}

// CREATE ADMIN
async function store(req, res) {
  try {
    let password = "";

    if (req.body.password !== "") {
      password = await bcrypt.hash(req.body.password, 10);
    }

    await Admin.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: password,
    });
    return res.json({ msg: "Admin created successfully." });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0].message, constraint: true });
  }
}

// UPDATE ADMIN
async function update(req, res) {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.json({ msg: "We apologize. Admin not found." });
    }
    await Admin.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
      { where: { id: req.params.id } },
    );
    return res.json({ msg: "Admin updated successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0].message, constraint: true });
  }
}

// DELETE ADMIN
async function destroy(req, res) {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.json({ msg: "Error 404. Admin not found." });
    }
    await Admin.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ msg: "Admin deleted successfully." });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0] });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
