const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const { expressjwt: checkJwt } = require("express-jwt");

// GET ALL ARTISTS
router.get("/", artistController.index);

// GET ONE ARTIST
router.get("/:id", artistController.show);

// CREATE ARTIST
router.post(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  artistController.store,
);

// UPDATE ARTIST
router.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  artistController.update,
);

// DELETE ARTIST
router.delete(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  artistController.destroy,
);

module.exports = router;
