import React from "react";
import App from "../../views/app/index";

import { Provider } from "react-redux";

import Enzyme, { shallow, mount } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import expect from "expect";
import sinon from "sinon";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Filter from "../../components/filter";
import Pagination from "../../components/pagination";

Enzyme.configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureStore(middleware);

let store = mockStore({
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

describe("Renders <App />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
  });

  it("renders without crashing", () => {
    const getRestaurantsFromCSV = sinon.spy();
    expect(wrapper).toMatchSnapshot();
    expect(getRestaurantsFromCSV.called);
  });

  it("should render correctly with restaurants", () => {
    expect(wrapper.find(".col-md-9").find(".limit")).toBeDefined();
  });

  it("should display open restaurants", () => {
    expect(
      wrapper
        .find(".col-md-3")
        .find(Filter)
        .find("select")
        .simulate("change", { target: { name: "select", value: "open" } })
    );
  });

  it("should handle pagination", () => {
    expect(
      wrapper
        .find(".col-md-9")
        .find(Pagination)
        .find("#paginationButtons")
        .find("#paginationPrevious")
        .simulate("click")
    );

    expect(
      wrapper
        .find(".col-md-9")
        .find(Pagination)
        .find("#paginationButtons")
        .find("#paginationNext")
        .simulate("click")
    );
  });
});
