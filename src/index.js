import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import MonEspace from "views/MonEspace.js";
import ChatPage from "views/ChatPage.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>

      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />


      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/:id" component={Profile} />

      <Route path="/" exact component={Index} />
      <Route path="/MonEspace" exact component={MonEspace} />
      <Route path="/chat/:carId/:userId/:sellerId" component={ChatPage} />


      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
