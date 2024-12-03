const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */

router.post("/tokens/users", authController.validateUser);

router.post("/tokens/admins", authController.validateAdmin);

module.exports = router;
