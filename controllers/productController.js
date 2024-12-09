const Product = require("../models/Product");
const Artist = require("../models/Artist");
const Category = require("../models/Category");

const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

/// ↓ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↓ *** ///

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/// ↑ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↑ *** ///

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img/products", /// * SUPABASE SETTINGS | COMMENT ONLY FOR DEPLOYMENT * ///
  keepExtensions: true,
});

// GET ALL PRODUCTS
async function index(req, res) {
  try {
    const products = await Product.findAll({
      include: [{ model: Artist }, { model: Category }],
    });
    return res.json(products);
  } catch (err) {
    console.log(err);
  }
}

// GET ONE PRODUCT
async function show(req, res) {
  try {
    const product = await Product.findByPk(req.params.id, { include: [{ model: Artist }] });
    return product
      ? res.json(product)
      : res.json({ msg: "Error 404. Product not found.", notFound: true });
  } catch (err) {
    console.log(err);
  }
}

// CREATE PRODUCT
async function store(req, res) {
  form.parse(req, async (err, fields, files) => {
    if (files.image.size === 0) {
      files.image.newFilename = "";
    } else {
      files.image.newFilename = files.image.originalFilename;
    }
    if (!fields.hasOwnProperty("tracklist")) {
      fields.tracklist = "";
    }

    try {
      const product = await Product.create({
        name: fields.name,
        tracklist: fields.tracklist,
        image: files.image.newFilename,
        price: fields.price,
        stock: fields.stock,
        artistId: fields.artistId,
        categoryId: fields.categoryId,
        featured: fields.featured,
      });

      if (product) {
        /// ↓ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↓ *** ///
        // const { data, error } = await supabase.storage
        //   .from("img/products")
        //   .upload(files.image.newFilename, fs.createReadStream(files.image.filepath), {
        //     cacheControl: "3600",
        //     upsert: false,
        //     contentType: files.image.mimetype,
        //     duplex: "half",
        //   });
        /// ↑ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↑ *** ///
      }

      return res.json({ msg: "Product added successfully." });
    } catch (err) {
      console.log(err);
      return res.json({ msg: err.errors[0].message, constraint: true });
    }
  });
}

// UPDATE PRODUCT
async function update(req, res) {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    return res.json({ msg: "We apologize. Product not found." });
  }

  form.parse(req, async (err, fields, files) => {
    if (files.image.size === 0) {
      files.image.newFilename = product.image;
    } else {
      files.image.newFilename = files.image.originalFilename;
    }

    if (!fields.hasOwnProperty("tracklist")) {
      fields.tracklist = "";
    }

    try {
      await Product.update(
        {
          name: fields.name,
          artistId: fields.artistId,
          image: files.image.newFilename,
          price: fields.price,
          stock: fields.stock,
          categoryId: fields.categoryId,
          tracklist: fields.tracklist,
          featured: fields.featured,
        },
        { where: { id: req.params.id } },
      );

      if (product) {
        /// ↓ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↓ *** ///
        // const { data, error } = await supabase.storage
        //   .from("img/products")
        //   .upload(files.image.newFilename, fs.createReadStream(files.image.filepath), {
        //     cacheControl: "3600",
        //     upsert: false,
        //     contentType: files.image.mimetype,
        //     duplex: "half",
        //   });
        /// ↑ *** SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT ↑ *** ///
      }

      return res.json({ msg: "Product updated successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ msg: err.errors[0].message, constraint: true });
    }
  });
}

// DELETE PRODUCT
async function destroy(req, res) {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ msg: "Product deleted successfully." });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
