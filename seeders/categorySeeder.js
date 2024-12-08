const { fakerEN_US: faker } = require("@faker-js/faker");
const { Category } = require("../models");

module.exports = async () => {
  const categories = [];

  categories.push(
    {
      name: "Post-hardcore", //1
      image: "post-hardcore.jpg",
    },
    {
      name: "Alternative Rock", //2
      image: "alternative-rock-1.webp",
    },
    {
      name: "Metalcore", // 3
      image: "metalcore.webp",
    },
    {
      name: "Pop-punk", // 4
      image: "pop-punk-1.webp",
    },
    {
      name: "jazz", // 5
      image: "jazz.jpg",
    },
    {
      name: "Folk Music", // 6
      image: "folk.jpg",
    },
    {
      name: "Indi", // 7
      image: "indi.jpg",
    },
  );

  await Category.bulkCreate(categories);
  console.log("[Database] Category seeder executed successfully.");
};
