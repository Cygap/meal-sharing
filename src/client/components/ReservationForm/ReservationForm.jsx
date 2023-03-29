import React, { useReducer } from "react";
export default function ReservationForm({ mealId }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "fieldChange":
        return { ...state, ...action.payload };
      case "clearForm":
        const newState = { ...state };

        const keys = Object.keys(state);
        for (let key of keys) {
          newState[key] = "";
        }

        return newState;
      default:
        console.log("%cForm action unknown", "color: #007acc;", action);
        return { ...state };
    }
  };

  const [formData, dispatchFormData] = useReducer(reducer, {
    number_of_guests: "",
    contact_name: "",
    email: "",
    phone_number: ""
  });

  const handleChange = ({ target }) => {
    dispatchFormData({
      type: "fieldChange",
      payload: { [target.name]: target.value }
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(
      "%cReservationForm.jsx line:45 dispatching submit",
      "color: #007acc;"
    );
    dispatchFormData({ type: "clearForm" });
  };
  return (
    <form name="meal-reservation" onSubmit={submitHandler}>
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
      <button type="submit">Reserve a meal</button>
    </form>
  );
}
