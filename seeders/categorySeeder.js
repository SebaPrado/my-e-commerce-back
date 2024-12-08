const { fakerEN_US: faker } = require("@faker-js/faker");
const { Category } = require("../models");

module.exports = async () => {
  const categories = [];

  categories.push(
    {
      name: "Hardcore", //1
      image: "hardcore-1.webp",
    },
    {
      name: "Post-hardcore", //2
      image: "post-hardcore.jpg",
    },
    {
      name: "Alternative Rock", //3
      image: "alternative-rock-1.webp",
    },
    {
      name: "Metalcore", // 4
      image: "metalcore.webp",
    },
    {
      name: "Pop-punk", // 5
      image: "pop-punk-1.webp",
    },
    {
      name: "jazz", // 6
      image: "jazz.jpg",
    },
    {
      name: "Folk Music", // 7
      image: "folk.jpg",
    },
    {
      name: "Indi", // 8
      image: "indi.jpg",
    },
  );

  await Category.bulkCreate(categories);
  console.log("[Database] Category seeder executed successfully.");
};
