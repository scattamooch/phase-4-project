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

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true") 
  // checks if it's equal to true (someone is logged in) and defaults to false if not
  // local storage returns null if looking for a key (in this case, ID) that does not exist
  const [activeUser, setActiveUser] = useState(localStorage.getItem("userId"))

  function handleLogin(data) {
    setActiveUser(data.user_id)
    localStorage.setItem("userId", data.user_id)
    setLoggedIn(true)
    localStorage.setItem("isLoggedIn", true)
    console.log(`${data}`)
    console.log(`Oh shit, somebody logged in: ${activeUser}`)
  }

  function handleLogout() {
    setLoggedIn(false)
    localStorage.setItem("isLoggedIn", false)
    setActiveUser(null)
    localStorage.removeItem("userId", null)
    console.log(`Bye ${activeUser}`)
    console.log("Oh shit, somebody logged out")
  }

  return (
    <div className="component-container">
      <Router>
        <Navbar loginStatus={loggedIn}
        handleLogout={handleLogout}
        activeUser={activeUser}/>
        <Switch>

        <Route exact path="/">
            <MovieCatalog loginStatus={loggedIn} activeUser={activeUser}/>
          </Route>

          <Route path="/movies">
            <MovieCatalog loginStatus={loggedIn} activeUser={activeUser}/>
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/profile/:id">
            <UserProfile activeUser={activeUser} handleLogout={handleLogout}/>
          </Route>
          
          <Route path="/login">
            <Login loginStatus = {loggedIn} handleLogin={handleLogin}/>
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
