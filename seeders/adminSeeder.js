const { fakerEN_US: faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models");

module.exports = async () => {
  const admins = [];

  const password = await bcrypt.hash("admin", 10);

  for (let i = 0; i < 5; i++) {
    const j = i + 1;
    admins.push({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: "admin" + j + "@ha.dev",
      password: password,
    });
  }

  await Admin.bulkCreate(admins);
  console.log("[Database] Admin seeder executed successfully.");
};
