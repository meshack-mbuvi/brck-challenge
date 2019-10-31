import React from "react";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import expect from "expect";

import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import SingleRestaurant from "../../views/app/singleRestaurant";

Enzyme.configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureStore(middleware);

let store = mockStore({
  Restaurants: {},
});

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
  location: {
    pathname: "/0",
  },
};

describe("Restaunts", () => {
  let wrapper = shallow(
    <Provider store={store}>
      <SingleRestaurant {...props} />
    </Provider>
  );

  it("renders <SingleRestaurant/> correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly for a restaurant that does not exist", () => {
    wrapper = mount(<SingleRestaurant {...props} />);
    expect(
      wrapper
        .find(".col-md-6")
        .find("p")
        .text()
    ).toEqual("No resturant found with given id");
  });

  it("should render restaurant details correctly", () => {
    props.store = mockStore({
      Restaurants: {
        restaurants: [
          {
            name: "Kushi Tsuru",
            ratings: [],
            opening_time: ["Mon-Sun 11 am - 10 pm"],
          },
        ],
      },
    });

    wrapper = mount(<SingleRestaurant {...props} />);
    expect(
      wrapper
        .find(".col-md-6")
        .find("p")
        .text()
    ).toEqual("Restaurant description");
  });
});
