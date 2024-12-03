const { fakerEN_US: faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

module.exports = async () => {
  const users = [];

  const password = await bcrypt.hash("user", 10);

  for (let i = 0; i < 15; i++) {
    const j = i + 1;
    users.push({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: "user" + j + "@ha.dev",
      password: password,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] User seeder executed successfully.");
};
