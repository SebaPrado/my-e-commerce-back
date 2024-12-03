const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
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
              msg: "Please enter a name for the category.",
            },
          },
          unique: {
            args: true,
            msg: "Category name already exists.",
          },
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please upload an image for the category.",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "category",
        timestamps: true,
      },
    );
    return Category;
  }
}

module.exports = Category;
