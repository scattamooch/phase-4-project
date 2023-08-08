import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from "react-router-dom";
import Navbar from "./Navbar.js"
import MovieCatalog from "./MovieCatalog.js"
import Main from "./Main.js"
import Profile from "./Profile.js";



function App() {
  return (
    <div className="component-container">
      <Router>
        <Navbar />
        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/movies">
            <MovieCatalog />
          </Route>

          <Route path="/profile">
              <Profile/>
          </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App;
