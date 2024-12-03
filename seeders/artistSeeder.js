const { fakerEN_US: faker } = require("@faker-js/faker");
const { Artist } = require("../models");

module.exports = async () => {
  const artists = [];

  artists.push(
    {
      name: "The Fall of Troy", //1
      description: "",
      image: "",
    },
    {
      name: "Hail the Sun", //2
      description: "",
      image: "",
    },
    {
      name: "Armor for Sleep", //3
      description: "",
      image: "",
    },
    {
      name: "Anberlin", //4
      description: "",
      image: "",
    },
    {
      name: "Bane", //5
      description: "",
      image: "",
    },
    {
      name: "Gideon", //6
      description: "",
      image: "",
    },
    {
      name: "Be Well", //7
      description: "",
      image: "",
    },
    {
      name: "Fairweather", //8
      description: "",
      image: "",
    },
    {
      name: "Greyhaven", //9
      description: "",
      image: "",
    },
    {
      name: "All Get Out", //10
      description: "",
      image: "",
    },
    {
      name: "Idlehands", //11
      description: "",
      image: "",
    },
    {
      name: "Texas in July", //12
      description: "",
      image: "",
    },
    {
      name: "We Came as Romans", //13
      description: "",
      image: "",
    },
    {
      name: "Pierce the Veil", //14
      description: "",
      image: "",
    },
    {
      name: "Waterparks", //15
      description: "",
      image: "",
    },
  );

  await Artist.bulkCreate(artists);
  console.log("[Database] Artist seeder executed successfully.");
};
