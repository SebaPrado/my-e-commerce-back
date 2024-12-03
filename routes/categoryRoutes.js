const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { expressjwt: checkJwt } = require("express-jwt");

// GET ALL CATEGORIES
router.get("/", categoryController.index);

// GET ONE CATEGORY
router.get(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  categoryController.show,
);

// CREATE CATEGORY
router.post(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  categoryController.store,
);

// UPDATE CATEGORY
router.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  categoryController.update,
);

// DELETE CATEGORY
router.delete(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  categoryController.destroy,
);

module.exports = router;
