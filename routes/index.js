const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const artistRoutes = require("./artistRoutes");
const categoryRoutes = require("./categoryRoutes");
const orderRoutes = require("./orderRoutes");

const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/admins", adminRoutes);
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
  app.use("/artists", artistRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/orders", orderRoutes);

  app.use("/", publicRoutes);
  app.use("/panel", privateRoutes);
};
