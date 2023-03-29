import React, { useEffect, useState } from "react";
export default function Reservations({ mealId }) {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.APP_BASE_URL}:${process.env.API_PORT}${process.env.API_PATH}/meals/${mealId}/Reservation`
        );
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log("%cReservations.jsx line:12 data", "color: #007acc;", data);
        if (data.length) {
          setReservations(data);
        }
      } catch (error) {
        console.log(
          "%cMealDetails.jsx line:17 error.message",
          "color: #007acc;",
          error.message
        );
      }
    })();
  }, []);
  return (
    <ul>
      {reservations.length ? (
        reservations.map((reservation) => (
          <li key={reservation.id}>
            <h3>{reservation.contact_name}</h3>
            <p>reserved {reservation.number_of_guests} palce(s)</p>
            <p>on: {Date(reservation.created_date)}</p>
          </li>
        ))
      ) : (
        <li>No reservations yet</li>
      )}
    </ul>
  );
}
