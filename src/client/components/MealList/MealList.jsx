import { MealsContext } from "../../providers/MealsContextProvider";
import React, { useContext, useEffect } from "react";
import MealFilter from "../MealFilter/MealFilter";
import mealListStyle from "./MealList.module.css";
import Meal from "../Meal/Meal";
import { Link } from "react-router-dom";

export default function MealsList() {
  const { fetchStatus, meals, dispatchMeals, setSearchParams, searchParams } =
    useContext(MealsContext);
  console.log("%cMealList.jsx line:9 meals", "color: #007acc;", meals);

  useEffect(() => {
    setSearchParams({ ...searchParams, limit: "" });
  }, []);
  return (
    <>
      <MealFilter />
      <ul className={mealListStyle.mealList}>
        {fetchStatus === "error" ? (
          <li>"No meals to show :("</li>
        ) : (
          meals.map((meal) => (
            <li key={meal.id}>
              <Link
                to={`${process.env.APP_BASE_URL}:${process.env.CLIENT_PORT}/meals/${meal.id}`}>
                <Meal mealId={meal.id} />
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
