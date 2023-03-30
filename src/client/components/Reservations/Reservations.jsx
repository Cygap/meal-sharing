import React, { useEffect, useState, useContext } from "react";
import { MealsContext } from "../../providers/MealsContextProvider";
import getReservations from "../../providers/getReservations";
import { FormContext } from "../../providers/FormsContextProvider";

export default function Reservations({ mealId }) {
  const { reservations, setReservations } = useContext(FormContext);
  const { setAvailable } = useContext(MealsContext);

  useEffect(() => {
    getReservations(mealId, setReservations, setAvailable);
  }, [mealId]);

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
