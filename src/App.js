import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";

import "./App.css";

function App() {
  console.log("Config: ", process.env.FIREBASE_CONFIG);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
      ;
    </Router>
  );
}

export default App;
