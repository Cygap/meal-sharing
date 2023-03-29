import React, { useContext } from "react";
import { FormContext } from "../../providers/FormsContextProvider";
export default function ReviewForm({ mealId }) {
  const { handleChange, submitHandler, formData } = useContext(FormContext);
  return (
    <form name="meal-review" onSubmit={submitHandler}>
      <input
        type="text"
        name="title"
        id={`title-${mealId}`}
        placeholder="review title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        id={`description-${mealId}`}
        placeholder="review title"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="stars"
        id={`stars-${mealId}`}
        min="1"
        max="5"
        placeholder="stars"
        value={formData.stars}
        onChange={handleChange}
      />
      <button type="submit">Submit a review</button>
    </form>
  );
}
