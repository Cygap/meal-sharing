import React, { useContext, useState } from "react";
import mealStyles from "./Meal.module.css";
import { MealsContext } from "../../providers/MealsContextProvider";
import { Link, Navigate, useParams } from "react-router-dom";
import mealPic from "../../assets/images/Meal-Placeholder.png";

export default function Meal({ mealId }) {
  const { meals, dispatchMeals, fetchStatus } = useContext(MealsContext);
  const [expanded, setExpanded] = useState(false);

  if (!meals.length && fetchStatus === "done") {
    return <Navigate to="/" />;
  }

  if (fetchStatus !== "done") {
    return <div>{fetchStatus}</div>;
  }

  const meal = meals.find((meal) => meal.id === Number(mealId));
  if (!meal) {
    return (
      <>
        <div>No meal found with provided id</div>
        <Link to="/">Home</Link>
      </>
    );
  }
  const { title, description, location, when, price, created_date } = meal;

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
        <img
          src={mealPic}
          alt="meal placeholder"
          width="100%"
          className={mealStyles.imageContainer}
        />
        <p>
          <b>Description:</b> {description ?? "Meal description is empty"}
        </p>

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
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "hide" : "details"}
        </button>
      </div>
    </div>
  );
}
