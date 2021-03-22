import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom"; 

import Auth from "pages/Auth";
import Home from "pages/Home";
import Profile from "pages/Profile";
import EditProfile from "pages/EditProfile";



function Router() {
  const [ isLoggedIn, setIsLoggedIn ] = useState( false );
  return (
    <HashRouter>
      <Switch>
        {isLoggedIn && (
          <>
            <Route exact path="/">
              <Home/>
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
