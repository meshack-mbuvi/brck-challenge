import React from "react";
import App from ".";

import { Provider } from "react-redux";

import store from "../../redux/store";

import Enzyme, { shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import expect from "expect";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

describe("Renders <App />", () => {
  it("renders without crashing", () => {
    const getRestaurantsFromCSV = sinon.spy();
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).debug();

    expect(wrapper).toMatchSnapshot();
    expect(getRestaurantsFromCSV.called);
  });
});
