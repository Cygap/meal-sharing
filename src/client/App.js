import React from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import HomeMeals from "./components/HomeMeals/HomeMeals";
import MealDetails from "./components/MealDetails/MealDetails";
import MealsList from "./components/MealList/MealList";
import "./App.css";
import MealsContextProvider from "./providers/MealsContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeMeals />
  },
  {
    path: "/meals",
    element: <MealsList />
  },
  {
    path: "/meals/:id",
    element: <MealDetails />
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
      <div className="app-wrapper">
        <header>
          <a href="/">
            <h1>Welcome to the meal sharing</h1>
          </a>
        </header>
        <div className={"content"}>
          <RouterProvider router={router} />
        </div>
        <footer>
          <p>© 2023, Alexander Sudarikov @ HYF</p>
        </footer>
      </div>
    </MealsContextProvider>
  );
}

export default App;
