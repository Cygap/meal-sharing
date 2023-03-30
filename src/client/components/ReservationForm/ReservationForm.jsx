import React, { useContext } from "react";
import { FormContext } from "../../providers/FormsContextProvider";
import { MealsContext } from "../../providers/MealsContextProvider";

export default function ReservationForm({ mealId }) {
  const { handleChange, submitHandler, formData } = useContext(FormContext);
  const { getMealById } = useContext(MealsContext);
  const disabled = !getMealById(mealId).available ?? true;
  console.log(
    "%cReservationForm.jsx line:9 disabled",
    "color: #007acc;",
    disabled
  );
  return (
    <form name="meal-reservation" onSubmit={submitHandler}>
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
          name="email"
          id={`email-${mealId}`}
          placeholder="your email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          id={`phone_number-${mealId}`}
          placeholder="your phone number"
          value={formData.phone_number}
          onChange={handleChange}
        />

        <button type="submit">
          {disabled ? "Meal is fully booked" : "Reserve a meal"}
        </button>
      </fieldset>
    </form>
  );
}
