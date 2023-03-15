import { MealsContext } from "../../providers/MealsContextProvider";
import React, { useContext } from "react";
import Meal from "../Meal/Meal";

export default function MealsList() {
  const [meals, dispatchMeals] = useContext(MealsContext);
  console.log("%cMealList.jsx line:6 meals", "color: #007acc;", meals);
  return (
    <ul>
      {meals.map((meal) => (
        <li key={meal.id}>
          <Meal title={meal.title} description={meal.description} />
        </li>
      ))}
    </ul>
  );
}
