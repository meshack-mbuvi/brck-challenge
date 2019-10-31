import { SET_RESTAURANTS } from "./types";
export const getRestaurantsFromCSV = () => async dispatch => {
  const response = await fetch("/data/restaurants.csv");
  let rawData = await response.body.getReader().read();
  let decoder = new TextDecoder("utf-8");

  const dataArray = decoder
    .decode(rawData.value)
    .replace(/['"]+/g, "")
    .split("\n");
  // format data into objects
  const restaurants = dataArray.map(restaurant => {
    const [name, time] = restaurant.split(",");
    return {
      name,
      ratings: [],
      opening_time: time.split("/"),
    };
  });

  return dispatch(setRestaurants(restaurants));
};

const setRestaurants = payload => {
  return {
    type: SET_RESTAURANTS,
    payload,
  };
};
