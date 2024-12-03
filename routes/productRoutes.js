const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { expressjwt: checkJwt } = require("express-jwt");

// GET ALL PRODUCTS
router.get("/", productController.index);

// GET ONE PRODUCT
router.get("/:id", productController.show);

// CREATE PRODUCT
router.post(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  productController.store,
);

// UPDATE PRODUCT
router.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  productController.update,
);

// DELETE PRODUCT
router.delete(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  productController.destroy,
);

module.exports = router;
