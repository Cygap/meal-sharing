export default async function getReservations(
  mealId,
  setReservations,
  setAvailable
) {
  try {
    const response = await fetch(
      `${process.env.APP_BASE_URL}:${process.env.API_PORT}${process.env.API_PATH}/meals/${mealId}/Reservation`
    );
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    console.log(
      "%cgetReservations.js line:13 getting reservations",
      "color: #007acc;",
      data
    );
    if (data.length) {
      setReservations(data);
      setAvailable(data, mealId);
    }
  } catch (error) {
    console.log(
      "%cMealDetails.jsx line:21 error.message",
      "color: #007acc;",
      error.message
    );
    setAvailable([], mealId);
  }
}
