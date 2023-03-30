import React, { useEffect, useState, useContext } from "react";
import { MealsContext } from "../../providers/MealsContextProvider";

export default function Reservations({ mealId }) {
  const [reservations, setReservations] = useState([]);
  const { setAvailable, meals } = useContext(MealsContext);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.APP_BASE_URL}:${process.env.API_PORT}${process.env.API_PATH}/meals/${mealId}/Reservation`
        );
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log("%cReservations.jsx line:15 data", "color: #007acc;", data);
        if (data.length) {
          setReservations(data);
          setAvailable(data, mealId);
        }
      } catch (error) {
        console.log(
          "%cMealDetails.jsx line:21 error.message",
          "color: #007acc;",
          error.message
        );
      }
    })();
  }, [mealId]);
  console.log("%cReservations.jsx line:29 meals", "color: #007acc;", meals);
  return (
    <ul>
      {reservations.length ? (
        reservations.map((reservation) => (
          <li key={reservation.id}>
            <h3>{reservation.contact_name}</h3>
            <p>reserved {reservation.number_of_guests} palce(s)</p>
            <p>
              on: {new Date(reservation.created_date).toLocaleString("dk-DK")}
            </p>
          </li>
        ))
      ) : (
        <li>No reservations yet</li>
      )}
    </ul>
  );
}
