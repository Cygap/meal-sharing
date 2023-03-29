import React from "react";
import { useParams } from "react-router-dom";
import FormContextProvider from "../../providers/FormsContextProvider";
import Meal from "../Meal/Meal";
import ReservationForm from "../ReservationForm/ReservationForm";
import ReviewForm from "../ReviewForm/ReviewForm";
export default function MealDetails() {
  const { id } = useParams();

  return (
    <>
      <Meal mealId={id} />
      <FormContextProvider>
        <ReservationForm mealId={id} />
        <ReviewForm mealId={id} />
      </FormContextProvider>
    </>
  );
}
