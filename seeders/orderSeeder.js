const { Order } = require("../models");
const { User } = require("../models");
const { fakerEN_US: faker } = require("@faker-js/faker");

module.exports = async () => {
  const users = await User.findAll();
  const orders = [];

  orders.push(
    {
      status: "pending",
      paymentMethod: "paypal",
      products: [
        {
          id: 1,
          name: "The Fall of Troy",
          image: "the-fall-of-troy-1.webp",
          price: "25",
          amount: 1,
          artist: "The Fall of Troy",
        },
      ],
      userId: 2,
      customerName:
        users.find((user) => user.id === 2).firstname +
        " " +
        users.find((user) => user.id === 2).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "transit",
      paymentMethod: "card",
      products: [
        {
          id: 11,
          name: "Give Blood",
          image: "bane-2.webp",
          price: "25",
          amount: 1,
          artist: "Bane",
        },
        {
          id: 17,
          name: "Kodak",
          image: "all-get-out-1.webp",
          price: "25",
          amount: 2,
          artist: "All Get Out",
        },
      ],
      userId: 3,
      customerName:
        users.find((user) => user.id === 3).firstname +
        " " +
        users.find((user) => user.id === 3).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "pending",
      paymentMethod: "card",
      products: [
        {
          id: 18,
          name: "Dena Mora",
          image: "idlehands-1.webp",
          price: "25",
          amount: 1,
          artist: "Idlehands",
        },
        {
          id: 15,
          name: "Deluge",
          image: "fairweather-1.webp",
          price: "25",
          amount: 1,
          artist: "Fairweather",
        },
      ],
      userId: 1,
      customerName:
        users.find((user) => user.id === 1).firstname +
        " " +
        users.find((user) => user.id === 1).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "paid",
      paymentMethod: "paypal",
      products: [
        {
          id: 4,
          name: "Mental Knife",
          image: "hail-the-sun-2.webp",
          price: "25",
          amount: 1,
          artist: "Hail the Sun",
        },
      ],
      userId: 5,
      customerName:
        users.find((user) => user.id === 5).firstname +
        " " +
        users.find((user) => user.id === 5).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "delivered",
      paymentMethod: "card",
      products: [
        {
          id: 9,
          name: "Silverline",
          image: "anberlin-2.webp",
          price: "25",
          amount: 1,
          artist: "Anberlin",
        },
        {
          id: 2,
          name: "Doppelganger",
          image: "the-fall-of-troy-2.webp",
          price: "25",
          amount: 1,
          artist: "The Fall of Troy",
        },
      ],
      userId: 4,
      customerName:
        users.find((user) => user.id === 4).firstname +
        " " +
        users.find((user) => user.id === 4).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "declined",
      paymentMethod: "paypal",
      products: [
        {
          id: 3,
          name: "Divine Inner Tension",
          image: "hail-the-sun-1.webp",
          price: "25",
          amount: 1,
          artist: "Hail the Sun",
        },
      ],
      userId: 4,
      customerName:
        users.find((user) => user.id === 4).firstname +
        " " +
        users.find((user) => user.id === 4).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "transit",
      paymentMethod: "card",
      products: [
        {
          id: 7,
          name: "Dream to Make Believe",
          image: "armor-for-sleep-2.webp",
          price: "25",
          amount: 1,
          artist: "Armor for Sleep",
        },
      ],
      userId: 3,
      customerName:
        users.find((user) => user.id === 3).firstname +
        " " +
        users.find((user) => user.id === 3).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "pending",
      paymentMethod: "paypal",
      products: [
        {
          id: 8,
          name: "Convinced",
          image: "anberlin-1.webp",
          price: "25",
          amount: 1,
          artist: "Anberlin",
        },
        {
          id: 16,
          name: "Empty Black",
          image: "greyhaven-1.webp",
          price: "25",
          amount: 1,
          artist: "Greyhaven",
        },
      ],
      userId: 1,
      customerName:
        users.find((user) => user.id === 1).firstname +
        " " +
        users.find((user) => user.id === 1).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "pending",
      paymentMethod: "card",
      products: [
        {
          id: 2,
          name: "Doppelganger",
          image: "the-fall-of-troy-2.webp",
          price: "25",
          amount: 1,
          artist: "The Fall of Troy",
        },
      ],
      userId: 1,
      customerName:
        users.find((user) => user.id === 1).firstname +
        " " +
        users.find((user) => user.id === 1).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
    {
      status: "declined",
      paymentMethod: "card",
      products: [
        { id: 12, name: "Cold", image: "gideon-1.webp", price: "25", amount: 1, artist: "Gideon" },
        {
          id: 15,
          name: "Deluge",
          image: "fairweather-1.webp",
          price: "25",
          amount: 1,
          artist: "Fairweather",
        },
      ],
      userId: 4,
      customerName:
        users.find((user) => user.id === 4).firstname +
        " " +
        users.find((user) => user.id === 4).lastname,
      shippingAddress: faker.location.streetAddress(),
    },
  );

  await Order.bulkCreate(orders);
  console.log("[Database] Order seeder executed successfully.");
};
