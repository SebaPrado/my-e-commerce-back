const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "Please enter a firstname.",
            },
          },
        },
        lastname: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "Please enter a lastname.",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
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
            msg: "Email already registered. Please provide another one.",
          },
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "Please enter a password.",
            },
          },
        },
        phone: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "Please enter a phone number.",
            },
          },
        },
        address: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "Please enter an address.",
            },
          },
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "user",
        timestamps: true,
        paranoid: true,
        hooks: {
          afterDestroy: async (instance) => {
            instance.firstname = null;
            instance.lastname = null;
            instance.email = null;
            instance.password = null;
            instance.phone = null;
            instance.address = null;
            instance.isAdmin = null;
            await instance.save();
          },
        },
      },
    );
    return User;
  }
}

module.exports = User;
