const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

// /api/meals	GET	Returns all meals

/*
/api/meals	POST	Adds a new meal to the database
/api/meals/:id	GET	Returns the meal by id
/api/meals/:id	PUT	Updates the meal by id
/api/meals/:id	DELETE	Deletes the meal by id*/

module.exports = router;
