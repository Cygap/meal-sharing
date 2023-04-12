import MealsList from "../MealList/MealList";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MealsContext } from "../../providers/MealsContextProvider";
export default function HomeMeals() {
  const { setSearchParams, searchParams } = useContext(MealsContext);
  useEffect(() => {
    setSearchParams({ ...searchParams, limit: 3 });
  }, []);
  return (
    <>
      <MealsList />
      <Link
        style={{
          margin: "1rem",
          textDecoration: "none",
          color: "blue"
        }}
        to={`${process.env.APP_BASE_URL}:${process.env.CLIENT_PORT}/meals/`}>
        ...See more meals
      </Link>
    </>
  );
}
