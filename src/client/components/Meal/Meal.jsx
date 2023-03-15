import React, { useContext } from "react";
import mealStyles from "./Meal.module.css";
import { MealsContext } from "../../providers/MealsContextProvider";
export default function Meal({ mealId }) {
  const [meals, dispatchMeals] = useContext(MealsContext);
  const meal = meals.find((meal) => meal.id === mealId);
  const { title, description, location, when, price, created_date } = meal;

  return (
    <div className={mealStyles.meal}>
      <div className={mealStyles.mealDetails}>
        <h2 className={mealStyles.title}>{title ?? "Meal title is empty"}:</h2>
        <p>Description: {description ?? "Meal description is empty"}</p>
        <p>placeholder for the picture</p>
        <p>Place: {location ?? "location is empty"}</p>
        <p>Meal time: {when ?? "no date is set yet"}</p>
        <p>Price: {price ?? "no price is set"}</p>
        <p>
          Date of creation: {created_date ?? "no creation date for this meal"}
        </p>
      </div>
      <div className={mealStyles.mealControls}>
        <button>modify</button>
        <button onClick={() => dispatchMeals({ type: "DEL", payload: [meal] })}>
          delete
        </button>
        <button>details</button>
      </div>
    </div>
  );
}
