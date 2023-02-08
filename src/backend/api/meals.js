const express = require("express");
const { response, request } = require("../app");
const router = express.Router();
const knex = require("../database");
const AccessError = require("./access-error");
const handleError = require("./error-handler");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("Meal").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    await knex("Meal").insert(request.body);
    response.status(201).json(request.body);
  } catch (error) {
    console.log(error.message);
    response.status(500).send(error.message);
  }
});

router.get("/:id", async (request, response) => {
  try {
    const titles = await knex("Meal")
      .select("title")
      .where("id", request.params.id);
    if (!titles.length) {
      throw new AccessError(
        "No meal found",
        "Provided id does not reference to any meal."
      );
    }
    response.json(titles);
  } catch (error) {
    handleError(error, response);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const updated = await knex("Meal")
      .update(request.body)
      .where("id", request.params.id);
    if (!updated) {
      throw new AccessError(
        "No meal found",
        "Provided id does not reference to any meal."
      );
    }
    response.json(request.body);
  } catch (error) {
    handleError(error, response);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    console.log(request);
    const deleted = await knex("Meal").delete().where("id", request.params.id);
    if (!deleted) {
      throw new AccessError(
        "No meal found",
        "Provided id does not reference to any meal."
      );
    }
    response.json(request.body);
  } catch (error) {
    handleError(error, response);
  }
});

module.exports = router;
