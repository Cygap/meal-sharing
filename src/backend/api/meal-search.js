function constructDBQuery(request, titlesQuery) {
  let sortDir = "ASC";
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
        titlesQuery = titlesQuery.where(
          `when`,
          ">",
          `${Date(request.query[key])}`
        );
        break;
      case "dateBefore":
        titlesQuery = titlesQuery.where(
          `when`,
          "<",
          `${Date(request.query[key])}`
        );
        break;
      case "limit":
        titlesQuery = titlesQuery.limit(`${Number(request.query[key])}`);
        break;
      case "sortkey":
        titlesQuery = titlesQuery.orderBy(`${request.query[key]}`, sortDir);
        break;
      case "sortDir":
        sortDir = request.query[key];
        break;
      case "availableReservations":
        /*titlesQuery = titlesQuery
          .join("Reservation", {
            "Meal.id": "Reservation.meal_id"
          })
          .groupBy("Meal.title");*/

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
  return titlesQuery;
}
module.exports = constructDBQuery;
