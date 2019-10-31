import { initialState } from "./initialState";
import { SET_RESTAURANTS } from "../actions/types";

export const Restaurants = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };

    default:
      return state;
  }
};
