import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { getRestaurantsFromCSV } from "../../redux/actions/restaurants";

import ListOfRestaurants from "../../components/restaurant/listOfRestaurants";
import Pagination from "../../components/pagination";
import { Filter } from "../../components/filter";

import { isOpen } from "../../utils";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      lowerIndex: 0,
      limitPerPage: 12,
      show: "all",
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getRestaurantsFromCSV());
  }

  /**
   * @summary handles limit per page based on the value selected by user.
   *
   * @param (Object) event.
   * @return (null).
   */
  handleLimitChange = event => {
    this.setState({
      limitPerPage: event.target.value,
    });
  };

  /**
   * @summary handles page change based on the value selected by user.
   * @description The method either increments or decrements the value of the
   *  current page.
   *
   * @param (number) page - page selected by user.
   * @param (Object) e.
   * @return (null).
   */
  handlePageChange = (page, e) => {
    let { currentPage, limitPerPage } = this.state;

    if (e) {
      if (e.target.id === "paginationNext") {
        currentPage += 1;
        this.setState({
          currentPage,
          lowerIndex: (currentPage - 1) * limitPerPage,
        });
      }

      if (e.target.id === "paginationPrevious") {
        currentPage -= 1;
        this.setState({
          currentPage,
          lowerIndex: (currentPage - 1) * limitPerPage,
        });
      }
    }

    if (page) {
      currentPage = page;
      this.setState({
        currentPage,
        lowerIndex: (currentPage - 1) * limitPerPage,
      });
    }
  };

  /**
   * @summary handles filter option selected by user.
   * @description The event object has a target with a value of
   * either all,open or closed.
   *
   * @param (Object) event
   * @return (null)
   */
  handleFilterOptionChange = event => {
    const {
      target: { value },
    } = event;

    this.setState({ show: value });
  };

  render() {
    let { restaurants } = this.props;
    const { currentPage, limitPerPage, lowerIndex, show } = this.state;

    if (show !== "all") {
      // filter restaurants by open/closed
      restaurants = restaurants.filter(restaurant => {
        const time = restaurant.opening_time;
        const [open, willOpen] = isOpen(time);

        restaurant.open = open;
        restaurant.willOpen = willOpen;

        if (show === "open") {
          return restaurant.open === true;
        }

        return restaurant.open === false;
      });
    }

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-12 col-md-3">
            <Filter handleOptionChange={this.handleFilterOptionChange} />
          </div>

          <div className="col-sm-12 col-md-9">
            <div className="row main">
              <ListOfRestaurants
                restaurants={restaurants.slice(
                  lowerIndex,
                  lowerIndex + limitPerPage
                )}
              />
            </div>

            <div className="ml-4 limit">
              {" "}
              Select limit per page:{" "}
              <select
                name="limit"
                id="limit"
                className="form-control ml-4 col-md-4"
                onChange={this.handleLimitChange}
              >
                <option value="9">9</option>
                <option value="18">18</option>
                <option value="24">24</option>
                <option value="20">30</option>
              </select>
            </div>

            <Pagination
              restaurants={restaurants}
              currentPage={currentPage}
              handlePageChange={this.handlePageChange}
              limitPerPage={limitPerPage}
            />
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
