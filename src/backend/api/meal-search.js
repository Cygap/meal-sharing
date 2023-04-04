const knex = require("../database");
function constructDBQuery(request, titlesQuery) {
  let sortDir;
  let sortKey;
  Object.keys(request.query).forEach((key) => {
    switch (key) {
      case "id":
        titlesQuery = titlesQuery.where(
          `id`,
          "=",
          `${Number(request.query[key])}`
        );
        break;
      case "maxPrice":
        titlesQuery = titlesQuery.where(
          `price`,
          "<",
          `${Number(request.query[key])}`
        );
        break;
      case "title":
        titlesQuery = titlesQuery.where(
          `${key}`,
          "like",
          `%${request.query[key]}%`
        );
        break;
      case "dateAfter":
        titlesQuery = titlesQuery.where(`when`, ">", `${request.query[key]}`);
        break;
      case "dateBefore":
        titlesQuery = titlesQuery.where(`when`, "<=", `${request.query[key]}`);
        break;
      case "limit":
        titlesQuery = titlesQuery.limit(`${Number(request.query[key])}`);
        break;
      case "sortDir":
        sortDir = request.query[key];
        break;
      case "sortKey":
        sortKey = request.query[key];
        if (request.query[key] === "availableReservations") {
          titlesQuery = titlesQuery.select(
            knex.raw(
              "Meal.max_reservations - (SELECT COALESCE(SUM(`Reservation`.number_of_guests),0) FROM `Reservation` WHERE `Meal`.id = `Reservation`.meal_id) as availableReservations"
            )
          );
        }
        break;

      case "availableReservations":
        if (request.query[key] === "true") {
          titlesQuery = titlesQuery.whereRaw(
            "Meal.max_reservations > (SELECT COALESCE(SUM(Reservation.number_of_guests),0) FROM Reservation WHERE Reservation.meal_id = Meal.id)"
          );
        } else {
          titlesQuery = titlesQuery.whereRaw(
            "Meal.max_reservations <= (SELECT COALESCE(SUM(Reservation.number_of_guests),0) FROM Reservation WHERE Reservation.meal_id = Meal.id)"
          );
        }
        break;
      default:
        throw new Error("wrong or unsupported search parameter");
    }
  });
  if (sortKey) {
    titlesQuery = titlesQuery.orderBy(sortKey, sortDir ?? "ASC");
  }
  return titlesQuery;
}
module.exports = constructDBQuery;
