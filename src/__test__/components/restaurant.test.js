import React from "react";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import expect from "expect";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { ListOfRestaurants } from "../../components/restaurant/listOfRestaurants";
import Restaurant from "../../components/restaurant/item";
import Pagination from "../../components/pagination";
import Filter from "../../components/filter";

Enzyme.configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

const props = {
  store,
  dispatch: jest.fn(),
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
  handleOptionChange: jest.fn(),
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
    expect(wrapper).toMatchSnapshot();

    wrapper.find("#paginationPrevious").simulate("click");
    expect(props.handlePageChange).toBeCalledTimes(1);
  });

  it("renders <Filter/> correctly", () => {
    wrapper = shallow(<Filter {...props} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find("select").simulate("change", { target: { value: "open" } });
    expect(props.handleOptionChange).toBeCalledTimes(1);
  });
});
