import { SET_RESTAURANTS } from "./types";

/**
 * @summary - This action handles loading of data from a CSV file
 * @description - The function reads a CSV file, pre-formats the each record
 *  into an object with title, ratings and opening_time. An action is then
 *  dispatched to add the data to the application store.
 *
 * @return (Function) dispacth
 */
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
    let [name, ...time] = restaurant.split(",");

    time = time.map(t => {
      return t.trim();
    });

    return {
      name,
      ratings: [],
      opening_time: time.join(",").split("/"),
    };
  });

  return dispatch(setRestaurants(restaurants));
};

/**
 * @summary - an action creator to add data to store.
 *
 * @param {Array} payload - an array with data to be send to store.
 * @return {Object} - an action creator with type and payload
 */
const setRestaurants = payload => {
  return {
    type: SET_RESTAURANTS,
    payload,
  };
};
