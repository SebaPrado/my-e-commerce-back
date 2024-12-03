const { Artist } = require("../models");
const { Op } = require("sequelize");
const formidable = require("formidable");

// GET ALL ARTISTS
async function index(req, res) {
  try {
    const artists = await Artist.findAll();
    return res.json(artists);
  } catch (err) {
    console.log(err);
  }
}

// GET ONE ARTIST
async function show(req, res) {
  try {
    const artist = await Artist.findByPk(req.params.id);
    return artist
      ? res.json(artist)
      : res.json({ msg: "Error 404. Artist not found.", notFound: true });
  } catch (err) {
    console.log(err);
  }
}

// CREATE ARTIST
async function store(req, res) {
  try {
    await Artist.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    });
    return res.json({ msg: "Artist added successfully." });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0].message, constraint: true });
  }
}

// UPDATE ARTIST
async function update(req, res) {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.json({ msg: "We apologize. Artist not found." });
    }
    await Artist.update(
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
      },
      { where: { id: req.params.id } },
    );
    return res.json({ msg: "Artist updated successfully." });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0].message, constraint: true });
  }
}

// DELETE ARTIST
async function destroy(req, res) {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.json({ msg: "We apologize. Artist not found." });
    }
    await Artist.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ msg: "Artist deleted successfully." });
  } catch (err) {
    console.log(err);
    if ((err.name = "SequelizeForeignKeyConstraintError")) {
      return res.json({
        msg: "Artist linked to existent products. It cannot be deleted.",
        constraint: true,
      });
    }
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
