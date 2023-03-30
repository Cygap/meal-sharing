import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormContextProvider from "../../providers/FormsContextProvider";
import { MealsContext } from "../../providers/MealsContextProvider";
import Meal from "../Meal/Meal";
import ReservationForm from "../ReservationForm/ReservationForm";
import Reservations from "../Reservations/Reservations";
import ReviewForm from "../ReviewForm/ReviewForm";

export default function MealDetails() {
  const { id } = useParams();
  const { setSearchParams, meals, fetchStatus } = useContext(MealsContext);
  useEffect(() => {
    setSearchParams({ id: { value: id } });
  }, []);
  const meal = meals.find((meal) => meal.id === Number(id));
  if (meal) {
    return (
      <>
        <Meal mealId={meal.id} />
        <FormContextProvider>
          <ReservationForm mealId={meal.id} disabled={false} />
          <Reservations mealId={meal.id} />
          <ReviewForm mealId={meal.id} disabled={false} />
        </FormContextProvider>
      </>
    );
  } else if (fetchStatus === "error") {
    return <div>Error occured while loading meal details... </div>;
  } else if (fetchStatus !== "done") {
    return <div>Loading meal details ... </div>;
  }
}
