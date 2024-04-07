import React from "react";
import { render } from "@testing-library/react";
import AddProject from "../components/AddProject";

describe("AddProject", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<AddProject />);

    expect(asFragment()).toMatchSnapshot();
  });
});
