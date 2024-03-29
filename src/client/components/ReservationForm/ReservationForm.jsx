import React, { useContext } from "react";
import { FormContext } from "../../providers/FormsContextProvider";
import { MealsContext } from "../../providers/MealsContextProvider";

export default function ReservationForm({ mealId, className }) {
  const { handleChange, submitHandler, formData } = useContext(FormContext);
  const { getMealById } = useContext(MealsContext);
  console.log(
    "%cReservationForm.jsx line:8 !getMealById(mealId).available",
    "color: #007acc;",
    !getMealById(mealId).available,
    mealId
  );
  let disabled = false;
  const currentMeal = getMealById(mealId);
  if (currentMeal.available !== undefined && currentMeal.available === false) {
    disabled = true;
  }

  return (
    <form
      className={className}
      name="meal-reservation"
      onSubmit={(e) => submitHandler(e, mealId)}>
      <fieldset disabled={disabled}>
        <input
          type="number"
          name="number_of_guests"
          id={`number_of_guests-${mealId}`}
          required
          placeholder="number of guests"
          min="1"
          value={formData.number_of_guests}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact_name"
          id={`contact_name-${mealId}`}
          placeholder="your name"
          value={formData.contact_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="contact_email"
          id={`contact_email-${mealId}`}
          placeholder="your email"
          value={formData.contact_email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact_phonenumber"
          id={`contact_phonenumber-${mealId}`}
          placeholder="your phone number"
          value={formData.contact_phonenumber}
          onChange={handleChange}
        />

        <button type="submit">
          {disabled ? "Meal is fully booked" : "Reserve a meal"}
        </button>
      </fieldset>
    </form>
  );
}
