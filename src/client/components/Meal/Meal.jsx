import React, { useContext, useState } from "react";
import mealStyles from "./Meal.module.css";
import { MealsContext } from "../../providers/MealsContextProvider";

export default function Meal({ mealId }) {
  const [meals, dispatchMeals] = useContext(MealsContext);
  const meal = meals.find((meal) => meal.id === mealId);
  const { title, description, location, when, price, created_date } = meal;
  const [expanded, setExpanded] = useState(false);
  const handleExpand = (e) => {
    setExpanded(!expanded);
  };
  const mealDetailsClassnames = `${mealStyles.mealDetails} ${
    expanded ? mealStyles.mealDetailsExpanded : ""
  }`;
  const mealWrapperStyles = `${mealStyles.meal} ${
    expanded ? mealStyles.mealWrapperExpanded : ""
  }`;

  return (
    <div className={mealWrapperStyles}>
      <div className={mealDetailsClassnames}>
        <h2 className={mealStyles.title}>{title ?? "Meal title is empty"}:</h2>
        <p>
          <b>Description:</b> {description ?? "Meal description is empty"}
        </p>
        <p>placeholder for the picture</p>
        <p>
          <b>Place:</b> {location ?? "location is empty"}
        </p>
        <p>
          <b>Meal time:</b> {when ?? "no date is set yet"}
        </p>
        <p>
          <b>Price:</b> {price ?? "no price is set"}
        </p>
        <p>
          <b>Date of creation:</b>{" "}
          {created_date ?? "no creation date for this meal"}
        </p>
      </div>
      <div className={mealStyles.mealControls}>
        <button onClick={() => dispatchMeals({ type: "UPD", payload: [meal] })}>
          modify
        </button>
        <button onClick={() => dispatchMeals({ type: "DEL", payload: [meal] })}>
          delete
        </button>
        <button onClick={handleExpand}>{expanded ? "hide" : "details"}</button>
      </div>
    </div>
  );
}
