import React from "react";
import { render } from "@testing-library/react";
import Overview from "../components/Overview";

describe("Overview", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Overview />);

    expect(asFragment()).toMatchSnapshot();
  });
});
