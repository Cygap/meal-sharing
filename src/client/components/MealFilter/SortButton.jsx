import React, { useContext } from "react";
import { MealsContext } from "../../providers/MealsContextProvider";
export default function SortButton() {
  const { searchParams, setSearchParams } = useContext(MealsContext);
  const handleChange = ({ target }) => {
    let newParams = { ...searchParams };
    newParams[target.name] = target.value;

    newParams.sortDir =
      target.selectedOptions[0].getAttribute("data-direction");

    setSearchParams(newParams);
  };
  return (
    <select name="sortKey" onChange={handleChange}>
      <option value="when" data-direction="ASC">
        date from earlier to later
      </option>
      <option value="when" data-direction="DESC">
        date from later to earlier
      </option>
      <option value="max_reservations" data-direction="ASC">
        from available to overbooked
      </option>
      <option value="max_reservations" data-direction="DESC">
        from overbooked tp available
      </option>
      <option value="price" data-direction="ASC">
        price from chepest to most expensive
      </option>
      <option value="price" data-direction="DESC">
        price from most expensive to chepest
      </option>
    </select>
  );
}
