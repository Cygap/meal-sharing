export default async function getReservations(mealId, setReviews) {
  try {
    const response = await fetch(
      `${process.env.APP_BASE_URL}:${process.env.API_PORT}${process.env.API_PATH}/meals/${mealId}/Review`
    );
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    console.log(
      "%cgetReviews.js line:13 getting reviews",
      "color: #007acc;",
      data
    );
    if (data.length) {
      setReviews(data);
    }
  } catch (error) {
    console.log(
      "%cMealDetails.jsx line:21 error.message",
      "color: #007acc;",
      error.message
    );
  }
}
