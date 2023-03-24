import { MealsContext } from "../../providers/MealsContextProvider";
import React, { useContext } from "react";
import Meal from "../Meal/Meal";
import mealListStyle from "./MealList.module.css";

export default function MealsList() {
  const [meals, dispatchMeals] = useContext(MealsContext);
  console.log("%cMealList.jsx line:6 meals", "color: #007acc;", meals);
  return (
    <ul className={mealListStyle.mealList}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <Meal mealId={meal.id} />
        </li>
      ))}
    </ul>
  );
}
