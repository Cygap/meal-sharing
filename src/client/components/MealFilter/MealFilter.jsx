import { MealsContext } from "../../providers/MealsContextProvider";
import React, { useContext } from "react";
export default function MealFilter(params) {
  const { searchParams, setSearchParams } = useContext(MealsContext);
  const handleChange = ({ target }) => {
    const newParams = {
      ...searchParams,
      title: { value: target.value }
    };

    setSearchParams(newParams);
  };

  return (
    <input
      type="text"
      placeholder="filter the meals by title"
      value={searchParams.title.value}
      onChange={handleChange}
    />
  );
}
