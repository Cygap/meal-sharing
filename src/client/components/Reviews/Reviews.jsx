import React, { useEffect, useContext } from "react";
import getReviews from "../../providers/getReviews";
import { FormContext } from "../../providers/FormsContextProvider";

export default function Reservations({ mealId, className }) {
  const { reviews, setReviews } = useContext(FormContext);

  useEffect(() => {
    getReviews(mealId, setReviews);
  }, [mealId]);

  return (
    <div>
      <h2>Meal reviews:</h2>
      <ul className={className}>
        {reviews.length ? (
          reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.title}</h3>
              <p>{review.description}</p>
              <p>on: {new Date(review.created_date).toLocaleString("dk-DK")}</p>
            </li>
          ))
        ) : (
          <li>No reviews yet</li>
        )}
      </ul>
    </div>
  );
}
