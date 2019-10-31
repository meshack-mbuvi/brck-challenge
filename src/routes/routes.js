import React from "react";
import { Router, Route } from "react-router-dom";

import history from "./history";
import App from "../views/app";
import RestaurantDetails from "../views/app/singleRestaurant";

const Routes = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/:id" component={RestaurantDetails} />
    </div>
  </Router>
);

export default Routes;
