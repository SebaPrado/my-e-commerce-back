const { Model, DataTypes } = require("sequelize");

class Artist extends Model {
  static initModel(sequelize) {
    Artist.init(
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
              msg: "Please enter a name for the artist.",
            },
          },
          unique: {
            args: true,
            msg: "Artist name already exists.",
          },
        },
        description: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "artist",
        timestamps: true,
      },
    );
    return Artist;
  }
}

module.exports = Artist;
