import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MealsList from "./components/MealList/MealList";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsContextProvider from "./providers/MealsContextProvider";

function App() {
  return (
    <MealsContextProvider>
      <Router>
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
      </Router>
    </MealsContextProvider>
  );
}

export default App;
