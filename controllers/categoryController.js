const { Category } = require("../models");
const { Op } = require("sequelize");

const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

// / ↓ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↓ *** ///

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// / ↑ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↑ *** ///

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img/categories", /// * SUPABASE SETTINGS | COMMENT ONLY FOR DEPLOYMENT * ///
  keepExtensions: true,
});

// GET ALL CATEGORIES
async function index(req, res) {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (err) {
    console.log(err);
  }
}

// GET ONE CATEGORY
async function show(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    return category
      ? res.json(category)
      : res.json({ msg: "Error 404. Category not found.", notFound: true });
  } catch (err) {
    console.log(err);
  }
}

// CREATE CATEGORY
async function store(req, res) {
  form.parse(req, async (err, fields, files) => {
    if (files.image.size === 0) {
      files.image.newFilename = "";
    }

    try {
      const category = await Category.create({
        name: fields.name,
        image: files.image.newFilename,
      });

      if (category) {
        /// ↓ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↓ *** ///
        // const { data, error } = await supabase.storage
        //   .from("img/categories")
        //   .upload(files.image.newFilename, fs.createReadStream(files.image.filepath), {
        //     cacheControl: "3600",
        //     upsert: false,
        //     contentType: files.image.mimetype,
        //     duplex: "half",
        //   });
        /// ↑ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↑ *** ///
      }

      return res.json({ msg: "Category added successfully." });
    } catch (err) {
      console.log(err);
      return res.json({ msg: err.errors[0].message, constraint: true });
    }
  });
}

// UPDATE CATEGORY
async function update(req, res) {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return res.json({ msg: "We apologize. Category not found." });
  }

  form.parse(req, async (err, fields, files) => {
    if (files.image.size === 0) {
      files.image.newFilename = category.image;
    }

    try {
      await Category.update(
        {
          name: fields.name,
          image: files.image.newFilename,
        },
        { where: { id: req.params.id } },
      );

      if (category) {
        /// ↓ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↓ *** ///
        // const { data, error } = await supabase.storage
        //   .from("img/categories")
        //   .upload(files.image.newFilename, fs.createReadStream(files.image.filepath), {
        //     cacheControl: "3600",
        //     upsert: false,
        //     contentType: files.image.mimetype,
        //     duplex: "half",
        //   });
        /// ↑ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↑ *** ///
      }

      return res.json({ msg: "Category updated successfully." });
    } catch (err) {
      console.log(err);
      return res.json({ msg: err.errors[0].message, constraint: true });
    }
  });
}

// DELETE CATEGORY
async function destroy(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.json({ msg: "We apologize. Category not found." });
    }
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ msg: "Category deleted successfully." });
  } catch (err) {
    console.log(err);
    if ((err.name = "SequelizeForeignKeyConstraintError")) {
      return res.json({
        msg: "Category linked to existent products. It cannot be deleted.",
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
