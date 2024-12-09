const { Sequelize } = require("sequelize");

const sequelizeOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION,
  logging: false,
  };
  if (process.env.DB_CONNECTION === "postgres") {
  sequelizeOptions.dialectModule = require("pg");
  }
  const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  sequelizeOptions,
  );

const Admin = require("./Admin");
const User = require("./User");
const Artist = require("./Artist");
const Product = require("./Product");
const Order = require("./Order");
const Category = require("./Category");

Admin.initModel(sequelize);
User.initModel(sequelize);
Artist.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
Category.initModel(sequelize);

Order.belongsTo(User);
User.hasMany(Order);

Product.belongsTo(Artist, {
  foreignKey: {
    name: "artistId",
    allowNull: false,
    validate: { notEmpty: true },
  },
});
Artist.hasMany(Product);

Product.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Please provide a category for the product.",
      },
    },
  },
});
Category.hasMany(Product);

module.exports = {
  sequelize,
  Admin,
  User,
  Artist,
  Product,
  Order,
  Category,
};
