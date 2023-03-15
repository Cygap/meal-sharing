import React, { createContext, useEffect, useState, useReducer } from "react";

export const MealsContext = createContext([
  [],
  (action) => {
    console.log(
      "%cError! dispatch without a context! action type: ",
      "color: #007acc;",
      action.type
    );
  }
]);

function MealsReducer(allMealsState, action) {
  const newMeals = [...allMealsState];
  switch (action.type) {
    case "ADD":
      let lastid = Math.max(...newMeals.map((meal) => meal.id));
      action.payload.forEach((meal) => (meal.id = ++lastid));
      return newMeals.concat(action.payload);
    case "DEL":
      newMeals.splice(
        allMealsState.map((meal) => meal.id).indexOf(action.payload[0].id),
        1
      );
      return newMeals;
    case "UPD":
      newMeals.splice(
        allMealsState.map((meal) => meal.id).indexOf(action.payload[0].id),
        1,
        action.payload[0]
      );
      return newMeals;
    case "DONE":
      const done = !action.payload[0].done;
      newMeals.splice(
        allMealsState.map((meal) => meal.id).indexOf(action.payload[0].id),
        1,
        { ...action.payload[0], done }
      );

      return newMeals;
    case "INIT":
      return action.payload;
    default:
      throw new Error("Unknown action!");
  }
}

const MealsContextProvider = (props) => {
  const [initialMeals = [], setInitialMeals] = useState();

  const [meals, dispatchMeals] = useReducer(MealsReducer, initialMeals);
  //ADD abort controller for slower connections, if paginizing meals later-on.
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.APP_BASE_URL}:${process.env.API_PORT}${process.env.API_PATH}/meals`
      );

      const meals = await response.json();

      setInitialMeals(meals);

      const action = { type: "INIT", payload: meals };

      dispatchMeals(action);
    })();
  }, []);

  return (
    <MealsContext.Provider value={[meals, dispatchMeals]}>
      {props.children}
    </MealsContext.Provider>
  );
};

export default MealsContextProvider;
