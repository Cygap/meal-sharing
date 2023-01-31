const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");
const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
//future-meals	Respond with all meals in the future (relative to the when datetime)

app.get("/future-meal", async (req, res) => {
  try {
    const dbData = await knex.raw(
      "Select * from Meal where Meal.when > CURRENT_TIMESTAMP()"
    );
    console.dir(dbData);
    if (dbData[0].length) {
      res.send(dbData[0]);
    } else {
      res.statusCode = 404;
      res.send("No planned meals found for future ...");
    }
  } catch (error) {
    console.error(error.message);
  }
});
//past-meals	Respond with all meals in the past (relative to the when datetime)
//all-meals	Respond with all meals sorted by ID
//first-meal	Respond with the first meal (meaning with the minimum id)
//last-meal	Respond with the last meal (meaning with the maximum id)
if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
