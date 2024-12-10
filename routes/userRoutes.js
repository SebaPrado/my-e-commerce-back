const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

// GET ALL USERS
router.get(
  "/",
  // checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.index,
);

// GET ONE USER
router.get(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.show,
);

// CREATE USER
router.post("/", userController.store);

// UPDATE USER
router.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.update,
);

// DELETE PRODUCT
router.delete(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.destroy,
);

module.exports = router;
