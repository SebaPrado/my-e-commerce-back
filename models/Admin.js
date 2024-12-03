const { Model, DataTypes } = require("sequelize");

class Admin extends Model {
  static initModel(sequelize) {
    Admin.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please enter a firstname.",
            },
          },
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please enter a lastname.",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please enter an email.",
            },
            isEmail: {
              msg: "Please enter a valid e-mail.",
            },
          },
          unique: {
            args: true,
            msg: "Email already registered. Please use another one.",
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please enter a password.",
            },
          },
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName: "admin",
        timestamps: true,
      },
    );
    return Admin;
  }
}

module.exports = Admin;
