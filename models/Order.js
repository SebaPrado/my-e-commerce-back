const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: DataTypes.ENUM("pending", "declined", "paid", "transit", "delivered"),
          defaultValue: "pending",
        },
        paymentMethod: {
          type: DataTypes.ENUM("card", "paypal"),
          defaultValue: "card",
        },
        products: {
          type: DataTypes.JSON,
        },
        customerName: {
          type: DataTypes.STRING,
        },
        shippingAddress: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "order",
        timestamps: true,
      },
    );
    return Order;
  }
}

module.exports = Order;
