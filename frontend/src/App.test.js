import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";
import MessageApp from "./App";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";

// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const component = mount(<MessageApp />);
    expect(component).toMatchSnapshot();
  });
  it("has textbox", () => {
    const component = mount(<MessageApp />);
    expect(component.exists("textarea#message_box")).toBe(true);
  });
  it("has submit button", () => {
    const component = mount(<MessageApp />);
    expect(component.exists("button#submit")).toBe(true);
  });
  it("has message list", () => {
    const component = mount(<MessageApp />);
    expect(component.exists("ul#message_list")).toBe(true);
  });
});
