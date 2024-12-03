const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please enter a name for the product.",
            },
          },
          unique: {
            args: true,
            msg: "Product name already exists.",
          },
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please upload an image for the product.",
            },
          },
        },
        tracklist: {
          type: DataTypes.JSON,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please enter a tracklist for the product.",
            },
          },
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please set a price for the product.",
            },
          },
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: { notEmpty: { msg: "Please set a stock for the product." } },
        },
        featured: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        slug: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "product",
        timestamps: true,
      },
    );
    return Product;
  }
}

module.exports = Product;
