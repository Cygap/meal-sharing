const express = require("express");
const { response, request } = require("../app");
const testRouter = express.Router();
const knex = require("../database");

//future-meals	Respond with all meals in the future (relative to the when datetime)
testRouter.get("/future-meals", async (req, res) => {
  try {
    const dbData = await knex.raw(
      "Select * from Meal where Meal.when > CURRENT_TIMESTAMP()"
    );

    res.json(dbData[0]);
  } catch (error) {
    res.statusCode = 500;
    console.error(error.message);
    res.send(error.message);
  }
});
//past-meals	Respond with all meals in the past (relative to the when datetime)
testRouter.get("/past-meals", async (req, res) => {
  try {
    const dbData = await knex.raw(
      "Select * from Meal where Meal.when < CURRENT_TIMESTAMP()"
    );

    res.json(dbData[0]);
  } catch (error) {
    res.statusCode = 500;
    console.error(error.message);
    res.send(error.message);
  }
});
//all-meals	Respond with all meals sorted by ID
testRouter.get("/all-meals", async (req, res) => {
  try {
    const dbData = await knex.raw("Select * from Meal order by Meal.id");

    res.json(dbData[0]);
  } catch (error) {
    res.statusCode = 500;
    console.error(error.message);
    res.send(error.message);
  }
});
//first-meal	Respond with the first meal (meaning with the minimum id)
testRouter.get("/first-meal", async (req, res) => {
  try {
    const dbData = await knex.raw(
      "Select * from Meal where Meal.id = (Select Min(Meal.id) from Meal)"
    );

    if (dbData[0].length) {
      res.json(dbData[0][0]);
    } else {
      res.statusCode = 404;
      res.send("No no meals found in a database ...");
    }
  } catch (error) {
    res.statusCode = 500;
    console.error(error.message);
    res.send(error.message);
  }
});
//last-meal	Respond with the last meal (meaning with the maximum id)
testRouter.get("/last-meal", async (req, res) => {
  try {
    const dbData = await knex.raw(
      "Select * from Meal where Meal.id = (Select MAX(Meal.id) from Meal)"
    );

    if (dbData[0].length) {
      res.json(dbData[0][0]);
    } else {
      res.statusCode = 404;
      res.send("No no meals found in a database ...");
    }
  } catch (error) {
    res.statusCode = 500;
    console.error(error.message);
    res.send(error.message);
  }
});

module.exports = testRouter;
