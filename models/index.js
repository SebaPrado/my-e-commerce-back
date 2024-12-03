const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    // dialectModule: require("pg"), /// * VERCEL/SUPABASE SETTINGS | UNCOMMENT ONLY FOR DEPLOYMENT * ///
    logging: false,
  },
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
