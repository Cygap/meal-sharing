import React, { createContext, useReducer, useState, useContext } from "react";
import getReservations from "./getReservations";
import { MealsContext } from "./MealsContextProvider";

export const FormContext = createContext({});

export default function FormContextProvider(props) {
  const [reservations, setReservations] = useState([]);
  const { setAvailable } = useContext(MealsContext);
  const postFormData = async (dataToPost, route) => {
    try {
      const response = await fetch(route, {
        method: "POST",
        body: JSON.stringify(dataToPost),
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      getReservations(dataToPost.meal_id, setReservations, setAvailable);
      console.log(
        "%cFormsContextProvider.jsx line:14 result",
        "color: #007acc;",
        result,
        reservations
      );
    } catch (error) {
      console.log(
        "%cposting form data failed...",
        "color: #ff0005;",
        error.message
      );
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "fieldChange":
        return { ...state, ...action.payload };
      case "formSubmit":
        const newState = { ...state };

        const keys = Object.keys(action.payload);
        for (let key of keys) {
          newState[key] = "";
        }
        postFormData(action.payload, action.route);
        return newState;
      default:
        console.log("%cForm action unknown", "color: #007acc;", action);
        return { ...state };
    }
  };
  const [formData, dispatchFormData] = useReducer(reducer, {
    number_of_guests: "",
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    title: "",
    description: "",
    stars: "",
    meal_id: ""
  });

  const handleChange = ({ target }) => {
    dispatchFormData({
      type: "fieldChange",
      payload: { [target.name]: target.value }
    });
  };

  const submitHandler = (event, meal_id) => {
    event.preventDefault();

    let route = `${process.env.APP_BASE_URL}:${process.env.API_PORT}${process.env.API_PATH}/`;

    switch (event.target.name) {
      case "meal-reservation":
        const {
          number_of_guests,
          contact_name,
          contact_email,
          contact_phonenumber
        } = formData;
        route += `reservations`;
        dispatchFormData({
          type: "formSubmit",
          payload: {
            number_of_guests,
            contact_name,
            contact_email,
            contact_phonenumber,
            meal_id,
            created_date: new Date().toISOString().split("T")[0]
          },
          route
        });
        break;
      case "meal-review":
        const { title, description, stars } = formData;
        route += `reviews`;
        dispatchFormData({
          type: "formSubmit",
          payload: {
            title,
            description,
            stars,
            meal_id,
            created_date: new Date().toISOString().split("T")[0]
          },
          route
        });
        break;
      default:
        break;
    }
  };

  return (
    <FormContext.Provider
      value={{
        handleChange,
        submitHandler,
        formData,
        reservations,
        setReservations
      }}>
      {props.children}
    </FormContext.Provider>
  );
}
