import React from "react";
import StarRatings from "react-star-ratings";
import "./item.css";

const formatName = name => {
  if (name.length > 20) {
    return name.slice(0, 20) + "...";
  }

  return name;
};

const calculateRating = ratings => {
  const numberOfratings = ratings.length;
  if (!numberOfratings) return 0;

  const sum = ratings.reduce((acc, currentValue) => acc + currentValue);
  return sum / numberOfratings;
};

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
