import React, { Component } from "react";
import { Restaurant } from "./item";
import "./item.css";

export class ListOfRestaurants extends Component {
  render() {
    const { restaurants } = this.props;

    const items = restaurants
      ? restaurants.map((restaurant, index) => (
          <Restaurant data={restaurant} key={index} />
        ))
      : restaurants;

    return <div className="col-md-12">{items}</div>;
  }
}

export default ListOfRestaurants;
