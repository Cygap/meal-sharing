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
    case "AVAILABLE":
      const mealToUpdate = newMeals.find(
        (meal) => meal.id === action.payload[0].id
      );
      if (mealToUpdate) {
        mealToUpdate.available = action.payload[0].available;
      }
      console.log(
        "%cMealsContextProvider.jsx line:49 mealToUpdate",
        "color: #007acc;",
        mealToUpdate
      );
      return newMeals;
    case "INIT":
      return action.payload;
    default:
      throw new Error("Unknown action!");
  }
}
const statusEnum = {
  loading: "loading",
  idle: "idle",
  done: "done",
  error: "error"
};
const MealsContextProvider = (props) => {
  const defaultFilter = {
    created_date: "",
    description: "",
    id: "",
    location: "",
    max_reservations: "",
    maxPrice: "",
    title: "",
    when: "",
    availableReservations: ""
  };
  const [searchParams, setSearchParams] = useState(defaultFilter);
  const [meals, dispatchMeals] = useReducer(MealsReducer, []);
  const [fetchStatus, setFetchStatus] = useState(statusEnum.idle);
  const getMealById = (id) => meals.find((meal) => meal.id === Number(id));
  // useEffect(() => {
  //   setSearchParams({ ...searchParams, limit: { value: 4 } });
  // }, []);

  //ADD abort controller for slower connections, if paginizing meals later-on.
  useEffect(() => {
    setFetchStatus(statusEnum.loading);
    const debounce = setTimeout(async () => {
      try {
        let queryParams = "";
        const keys = Object.keys(searchParams);
        for (let key of keys) {
          if (searchParams[key]) {
            queryParams += `${key}=${searchParams[key]}&`;
          }
        }

        const response = await fetch(
          `${process.env.APP_BASE_URL}:${process.env.API_PORT}${process.env.API_PATH}/meals?${queryParams}`
        );
        if (!response.ok) {
          setFetchStatus(statusEnum.error);
          throw new Error(response.statusText);
        }
        const meals = await response.json();

        const action = { type: "INIT", payload: meals };

        dispatchMeals(action);
        setFetchStatus(statusEnum.done);
      } catch (error) {
        console.log(
          "%c Error happend while fetching",
          "color: #007acc;",
          error.message
        );
      }
    }, 200);
    return () => {
      clearTimeout(debounce);
      setFetchStatus(statusEnum.idle);
    };
  }, [searchParams]);

  const setAvailable = (reservations, mealId) => {
    const bookings = reservations.reduce(
      (sum, reservation) => (sum += reservation.number_of_guests),
      0
    );
    console.log(
      "%cMealsContextProvider.jsx line:114 bookings",
      "color: #007acc;",
      bookings,
      meals
    );
    const maxReservations = getMealById(mealId).max_reservations;
    const available = maxReservations > bookings && maxReservations - bookings;
    dispatchMeals({
      type: "AVAILABLE",
      payload: [{ id: Number(mealId), available }]
    });
  };

  return (
    <MealsContext.Provider
      value={{
        meals,
        dispatchMeals,
        searchParams,
        setSearchParams,
        fetchStatus,
        setAvailable,
        getMealById
      }}>
      {props.children}
    </MealsContext.Provider>
  );
};

export default MealsContextProvider;
