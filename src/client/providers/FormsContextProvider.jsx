import React, { createContext, useReducer } from "react";

export const FormContext = createContext({});

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

export default function FormContextProvider(props) {
  const [formData, dispatchFormData] = useReducer(reducer, {
    number_of_guests: "",
    contact_name: "",
    email: "",
    phone_number: "",
    title: "",
    description: "",
    stars: ""
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
    <FormContext.Provider value={{ handleChange, submitHandler, formData }}>
      {props.children}
    </FormContext.Provider>
  );
}
