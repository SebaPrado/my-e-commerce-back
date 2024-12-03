const { Order } = require("../models");
const { User } = require("../models");

// GET ALL ORDERS
async function index(req, res) {
  try {
    const orders = await Order.findAll({ order: [["createdAt", "DESC"]] });
    return res.json(orders);
  } catch (err) {
    console.log(err);
  }
}

// GET ONE ORDER
async function show(req, res) {
  try {
    const order = await Order.findByPk(req.params.id);
    return order
      ? res.json(order)
      : res.json({ msg: "Error 404. Order not found.", notFound: true });
  } catch (err) {
    console.log(err);
  }
}

// CREATE ORDER
async function store(req, res) {
  const user = await User.findByPk(req.auth.sub);
  const customerName = user.firstname + " " + user.lastname;

  try {
    await Order.create({
      userId: req.auth.sub,
      customerName: customerName,
      paymentMethod: req.body.paymentMethod,
      products: req.body.products,
    });
    return res.json({ msg: "Order added successfully." });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0].message, constraint: true });
  }
}

// UPDATE ORDER
async function update(req, res) {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.json({ msg: "We apologize. Order not found." });
    }
    await Order.update(
      {
        status: req.body.status,
      },
      { where: { id: req.params.id } },
    );
    return res.json({ msg: "Order updated successfully." });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0].message, constraint: true });
  }
}

// DELETE CATEGORY
async function destroy(req, res) {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.json({ msg: "We apologize. Order not found." });
    }
    await Order.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ msg: "Order deleted successfully." });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
