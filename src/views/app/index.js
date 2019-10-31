import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { getRestaurantsFromCSV } from "../../redux/actions/restaurants";

import ListOfRestaurants from "../../components/restaurant/listOfRestaurants";

class index extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getRestaurantsFromCSV());
  }

  render() {
    const { restaurants } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            Recent views to be displayed here
          </div>

          <div className="col-sm-12 col-md-9">
            <div className="row main">
              <ListOfRestaurants restaurants={restaurants} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Restaurants }) => {
  return {
    restaurants: Restaurants.restaurants || [],
  };
};

export default connect(mapStateToProps)(index);
