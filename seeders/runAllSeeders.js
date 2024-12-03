require("dotenv").config();

async function runAllSeeders() {
  await require("./adminSeeder")();
  await require("./userSeeder")();
  await require("./categorySeeder")();
  await require("./artistSeeder")();
  await require("./productSeeder")();
  await require("./orderSeeder")();

  console.log("[Database] Seeders data insertion successful!");
}

runAllSeeders();
