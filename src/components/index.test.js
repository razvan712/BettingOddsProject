import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; // Import MemoryRouter

import About from "./About";

describe("About", () => {
  test("renders about", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/ABOUT/i);
    expect(linkElement).toBeInTheDocument();
  });

  describe("renders about", () => {
    test("renders us", () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>
      );

      const linkElement = screen.getByText(/Us/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
