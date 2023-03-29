import { MealsContext } from "../../providers/MealsContextProvider";
import React, { useContext } from "react";

import mealListStyle from "./MealList.module.css";
import Meal from "../Meal/Meal";
import { Link } from "react-router-dom";

export default function MealsList() {
  const { fetchStatus, meals, dispatchMeals } = useContext(MealsContext);
  console.log("%cMealList.jsx line:9 meals", "color: #007acc;", meals);
  return (
    <ul className={mealListStyle.mealList}>
      {fetchStatus === "error" ? (
        <li>"No meals to show :("</li>
      ) : (
        meals.map((meal) => (
          <li key={meal.id}>
            <Link to={`meals/${meal.id}`}>
              <Meal mealId={meal.id} />
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
