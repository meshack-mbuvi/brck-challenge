import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { getRestaurantsFromCSV } from "../../redux/actions/restaurants";

import ListOfRestaurants from "../../components/restaurant/listOfRestaurants";
import Pagination from "../../components/pagination";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      lowerIndex: 0,
      limitPerPage: 12,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getRestaurantsFromCSV());
  }

  handleLimitChange = e => {
    this.setState({
      limitPerPage: e.target.value,
    });
  };

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

  render() {
    const { restaurants } = this.props;
    const { currentPage, limitPerPage, lowerIndex } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            Filter by: To be implemented here
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
            <div className="ml-4">
              {" "}
              Select limit per page:{" "}
              <select
                name="limit"
                id="limit"
                className="form-control ml-4 col-md-4"
                onChange={this.handleLimitChange}
              >
                <option value="12">12</option>
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
