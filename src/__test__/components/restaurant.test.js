import React from "react";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import expect from "expect";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { ListOfRestaurants } from "../../components/restaurant/listOfRestaurants";
import Restaurant from "../../components/restaurant/item";
import Pagination from "../../components/pagination";

Enzyme.configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

const props = {
  dispatch: jest.fn(),
  store,
  restaurants: [
    {
      name: "Kushi Tsuru",
      ratings: [],
      opening_time: ["Mon-Sun 11 am - 10 pm"],
    },
  ],
  handlePageChange: jest.fn(),
  currentPage: 1,
  limitPerPage: 10,
};

describe("Restaunts", () => {
  let wrapper = shallow(<ListOfRestaurants props={props} />);

  it("renders <ListOfRestaurant/> correctly", () => {
    expect(wrapper.find(".col-md-12").length).toEqual(1);
  });

  it("renders <Restaurant/> component", () => {
    wrapper = shallow(<Restaurant data={props.restaurants[0]} />);
    expect(wrapper.find(".details").length).toEqual(1);
  });

  it("renders <Pagination/> correctly", () => {
    wrapper = shallow(<Pagination {...props} />);
  });
});
