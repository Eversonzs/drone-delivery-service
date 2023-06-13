import Home from "../src/app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a home page", () => {
    render(<Home />);
    // check if all components are rendered
    expect(screen.queryByTestId("appTitleText")).toBeInTheDocument();
    expect(screen.queryByTestId("createdBy")).toBeInTheDocument();
    expect(screen.queryByTestId("dropZone")).toBeInTheDocument();
    expect(screen.queryByTestId("resultDiv")).toBeInTheDocument();
  });
});

