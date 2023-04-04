import { MealsContext } from "../../providers/MealsContextProvider";
import React, { useContext } from "react";
import SortButton from "./SortButton";
import styles from "./filter.module.css";
export default function MealFilter(params) {
  const { searchParams, setSearchParams } = useContext(MealsContext);
  const handleChange = ({ target }) => {
    let newParams = { ...searchParams };
    if (target.name === "availableReservations") {
      newParams[target.name] = newParams[target.name] ? "" : true;
    } else {
      newParams[target.name] = target.value;
    }
    setSearchParams(newParams);
  };

  return (
    <div className={styles.filterForm}>
      <SortButton />
      <input
        type="text"
        name="title"
        placeholder="filter the meals by title"
        value={searchParams.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="maxPrice"
        placeholder="filter the meals by maximal price"
        value={searchParams.maxPrice}
        onChange={handleChange}
      />

      <input
        type="text"
        name="when"
        placeholder="filter the meals by when"
        value={searchParams.when}
        onChange={handleChange}
      />
      <label htmlFor="availableReservations">
        Show only available meals
        <input
          type="checkbox"
          name="availableReservations"
          id="availableReservations"
          onChange={handleChange}
          checked={searchParams.availableReservations}
        />
      </label>
    </div>
  );
}
