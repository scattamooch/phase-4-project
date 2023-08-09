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

  const [loggedIn, setLoggedIn] = useState(false)
  const [activeUser, setActiveUser] = useState(null)

  function handleLogin(data) {
    setActiveUser(data.user_id)
    setLoggedIn(true)
    console.log(`${data}`)
    console.log(`Oh shit, somebody logged in: ${activeUser}`)
  }

  function handleLogout() {
    setLoggedIn(false)
    setActiveUser(null)
    console.log(`Bye ${activeUser}`)
    console.log("Oh shit, somebody logged out")
  }


  return (
    <div className="component-container">
      <Router>
        <Navbar loginStatus={loggedIn} handleLogout={handleLogout}/>
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
            <UserProfile activeUser={activeUser}/>
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
