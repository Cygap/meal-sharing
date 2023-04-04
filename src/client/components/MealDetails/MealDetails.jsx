import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormContextProvider from "../../providers/FormsContextProvider";
import { MealsContext } from "../../providers/MealsContextProvider";
import Meal from "../Meal/Meal";
import ReservationForm from "../ReservationForm/ReservationForm";
import Reservations from "../Reservations/Reservations";
import ReviewForm from "../ReviewForm/ReviewForm";
import Reviews from "../Reviews/Reviews";
import styles from "./MealDetails.module.css";

export default function MealDetails() {
  const { id } = useParams();
  const { setSearchParams, getMealById, fetchStatus } =
    useContext(MealsContext);
  useEffect(() => {
    setSearchParams({ id });
  }, []);
  const meal = getMealById(id);
  if (meal) {
    return (
      <>
        <FormContextProvider>
          <div className={styles.detailsLayout}>
            <div className={styles.formsLayout}>
              <Meal mealId={meal.id} />
              <ReservationForm mealId={meal.id} className={styles.form} />
              <ReviewForm
                mealId={meal.id}
                disabled={false}
                className={styles.form}
              />
            </div>
            <Reviews mealId={meal.id} className={styles.list} />
            <Reservations mealId={meal.id} className={styles.list} />
          </div>
        </FormContextProvider>
      </>
    );
  } else if (fetchStatus === "error") {
    return <div>Error occured while loading meal details... </div>;
  } else if (fetchStatus !== "done") {
    return <div>Loading meal details ... </div>;
  }
}
