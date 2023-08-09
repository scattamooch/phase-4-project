import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from "react-router-dom";
import Navbar from "./Navbar.js"
import MovieCatalog from "./MovieCatalog.js"
import Main from "./Main.js"
import Users from "./Users.js";
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import UserProfile from "./UserProfile.js"

function App() {

  const userId = 1

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

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/profile/:id">
            <UserProfile userId={userId}/>
          </Route>
          
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/sign-up">
            <SignUp />
          </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App;
