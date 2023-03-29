import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormContextProvider from "../../providers/FormsContextProvider";
import Meal from "../Meal/Meal";
import ReservationForm from "../ReservationForm/ReservationForm";
import Reservations from "../Reservations/Reservations";
import ReviewForm from "../ReviewForm/ReviewForm";

export default function MealDetails() {
  const { id } = useParams();

  return (
    <>
      <Meal mealId={id} />
      <FormContextProvider>
        <ReservationForm mealId={id} />
        <Reservations mealId={id} />
        <ReviewForm mealId={id} />
      </FormContextProvider>
    </>
  );
}
