const express = require("express");
const { response, request } = require("../app");
const router = express.Router();
const knex = require("../database");
const AccessError = require("./access-error");
const handleError = require("./error-handler");

const routesListToDBTables = {
  "/api/meals": ["Meal", "title"],
  "/api/reservations": ["Reservation", "contact_name"]
};

router.get("/", async (request, response, next) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex(routesListToDBTables[request.baseUrl][0]).select(
      routesListToDBTables[request.baseUrl][1]
    );
    response.json(titles);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    await knex(routesListToDBTables[request.baseUrl][0]).insert(request.body);
    response.status(201).json(request.body);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const titles = await knex(routesListToDBTables[request.baseUrl][0])
      .select(routesListToDBTables[request.baseUrl][1])
      .where("id", request.params.id);
    if (!titles.length) {
      throw new AccessError(
        "No meal found",
        "Provided id does not reference to any meal."
      );
    }
    response.json(titles);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    console.log(
      "%cmeals.js line:47 request.baseUrl",
      "color: #007acc;",
      request.baseUrl
    );
    const updated = await knex(routesListToDBTables[request.baseUrl][0])
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
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const deleted = await knex(routesListToDBTables[request.baseUrl][0])
      .delete()
      .where("id", request.params.id);
    if (!deleted) {
      throw new AccessError(
        "No meal found",
        "Provided id does not reference to any meal."
      );
    }
    response.json(request.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
