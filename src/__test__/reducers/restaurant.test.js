import expect from "expect";
import { Restaurants } from "../../redux/reducers/restaurants";
import { SET_RESTAURANTS } from "../../redux/actions/types";

const initialState = {
  restaurants: [],
};

describe("Read csv file", () => {
  const action = {};
  it("should return initial state when where is no action", () => {
    expect(Restaurants(initialState, {})).toEqual(initialState);
  });

  it("should read csv file", () => {
    action.type = SET_RESTAURANTS;
    action.payload = [
      {
        name: "Kushi Tsuru",
        ratings: [],
        opening_time: ["Mon-Sun 11 am - 10 pm"],
      },
    ];

    expect(Restaurants(initialState.restaurants, action)).toEqual({
      restaurants: [
        {
          name: "Kushi Tsuru",
          ratings: [],
          opening_time: ["Mon-Sun 11 am - 10 pm"],
        },
      ],
    });
  });
});
