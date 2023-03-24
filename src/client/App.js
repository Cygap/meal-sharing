import React from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Meal from "./components/Meal/Meal";
import MealsList from "./components/MealList/MealList";

import MealsContextProvider from "./providers/MealsContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Meal Sharing home page</h1>
  },
  {
    path: "/meals",
    element: <MealsList />
  },
  {
    path: "/meals/:id",
    element: <Meal mealId={0} />
  },
  {
    path: "*",
    element: (
      <div>
        <h1>404, page not found</h1>
        <Link to="/">Home</Link>
      </div>
    )
  }
]);

function App() {
  return (
    <MealsContextProvider>
      <RouterProvider router={router} />
      {/* <Router>
        <Route exact path="/">
          <h1>I am a meal-sharing APP. Here are the meals:</h1>
          <MealsList />
        </Route>
        <Route exact path="/lol">
          <p>lol</p>
        </Route>
        <Route exact path="/test-component">
          <TestComponent></TestComponent>
        </Route>
      </Router> */}
    </MealsContextProvider>
  );
}

export default App;
