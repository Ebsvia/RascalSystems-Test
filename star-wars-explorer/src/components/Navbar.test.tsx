import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";

describe("Navbar", () => {
  it("renders the brand title and links it to home", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const brandLink = screen.getByText(/StarWars API/i);
    expect(brandLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders desktop links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const links = ["people", "planets", "species", "starships", "vehicles"];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("toggles mobile menu when hamburger is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // At first, mobile menu should not be visible
    expect(screen.queryByText("people")).toBeInTheDocument(); // desktop
    expect(screen.queryByText("people")).toBeVisible(); // visible only in desktop

    // hamburger click
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Now the mobile menu should appear
    expect(screen.getAllByText("people").length).toBeGreaterThan(1);

    // Clicking again should close it
    fireEvent.click(button);
    expect(screen.getAllByText("people").length).toBe(1);
  });
});
