import React from "react";
import StarRatings from "react-star-ratings";
import "./item.css";

/**
 * @description - Ellipsise name if its longer that the 20 characters.
 *
 * @param {string} name - name of the restaurant.
 * @return {string} name - a pre-formated name based on the length of the param.
 */
const formatName = name => {
  if (name.length > 20) {
    return name.slice(0, 20) + "...";
  }

  return name;
};

/**
 * @summary - calculates the average rating for a particular restaurant
 *
 * @param {array} ratings - contains all ratings for the restaurant
 * @return {Number} ratings - average of the ratings provided for a restaurant.
 */
const calculateRating = ratings => {
  const numberOfratings = ratings.length;
  if (!numberOfratings) return 0;

  const sum = ratings.reduce((acc, currentValue) => acc + currentValue);
  return sum / numberOfratings;
};

/**
 * @summary - component to display a single restaurant.
 *
 * @param {Object} props
 * @return {DOMnode}
 */
export const Restaurant = props => {
  const { name, ratings } = props.data;
  const rating = calculateRating(ratings);

  return (
    <div className="details card col-md-3">
      <a href={name} className="card-link">
        {formatName(name)}
      </a>

      <div className="card-footer">
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
    </div>
  );
};

export default Restaurant;
