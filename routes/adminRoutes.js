const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { expressjwt: checkJwt } = require("express-jwt");

// GET ALL ADMINS
router.get(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminController.index,
);

// GET ONE ADMIN
router.get(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminController.show,
);

// CREATE ADMIN
router.post("/", adminController.store);

// UPDATE ADMIN
router.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminController.update,
);

// DELETE PRODUCT
router.delete(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminController.destroy,
);

module.exports = router;
