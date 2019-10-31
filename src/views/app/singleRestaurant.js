import React, { Component } from "react";

import { connect } from "react-redux";

import { getRestaurantsFromCSV } from "../../redux/actions/restaurants";
import { calculateRating } from "../../components/restaurant/item";

import StarRatings from "react-star-ratings";

import { isOpen } from "../../utils";
import "./App.css";

class SingleRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch(getRestaurantsFromCSV());

    // Extract restaurant index
    const [, restaurantId] = location.pathname.split("/");

    this.setState({
      restaurantId: parseInt(restaurantId),
    });
  }

  render() {
    const { restaurants } = this.props;
    const { restaurantId } = this.state;

    let name;
    let ratings = [];
    let opening_time;

    const rating = calculateRating(ratings);

    const restaurant = restaurants[restaurantId];
    let open;
    let willOpen;

    if (!restaurant) {
      return (
        <div className="container">
          <div className="row mt-4">
            <div className="col-sm-12 col-md-3" />
            <div className="col-sm-12 col-md-6">
              <p>No resturant found with given id</p>
            </div>
          </div>
        </div>
      );
    }

    if (restaurant) {
      name = restaurant.name;
      ratings = restaurant.ratings;
      opening_time = restaurant.opening_time;

      [open, willOpen] = isOpen(opening_time);
    }

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-12 col-md-3" />

          <div className="col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Restaurant description</p>
              </div>
              <div className="card-footer">
                <div>
                  <span>Ratings: </span>
                  <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    numberOfStars={5}
                    name="rating"
                    starDimension="10px"
                    starSpacing="2px"
                  />
                </div>

                <div className="row status">
                  <div className="col-md-6 status">
                    Time:{" "}
                    <span>
                      <span>{open ? "Open" : "closed"}</span>
                    </span>
                  </div>

                  <div className="col-md-6 status">
                    {open ? (
                      ""
                    ) : (
                      <React.Fragment>
                        Will open:{" "}
                        <span className="status">
                          <span>{willOpen}</span>
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
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

export default connect(mapStateToProps)(SingleRestaurant);
