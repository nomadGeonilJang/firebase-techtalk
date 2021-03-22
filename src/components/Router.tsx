import React from "react";
import firebase from "firebase";
import { HashRouter, Route, Switch } from "react-router-dom"; 

import Auth from "pages/Auth";
import Home from "pages/Home";
import Profile from "pages/Profile";
import EditProfile from "pages/EditProfile";
import NavigationBar from "components/NavigationBar";


type RouterProps = {
    isLoggedIn:boolean
    userObj:firebase.User | null
}

function Router( { isLoggedIn, userObj }:RouterProps ) {
  return (
    <HashRouter>
      {isLoggedIn && <NavigationBar/>}
      <Switch>
        {isLoggedIn && (
          <>
            <Route exact path="/">
              <Home userObj={userObj}/>
            </Route>
            <Route path="/profile">
              <Profile/>
            </Route>
            <Route path="/profile/edit">
              <EditProfile/>
            </Route>
          </>
        )}
        {!isLoggedIn && (
          <Route exact path="/">
            <Auth/>
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
}

export default Router;
