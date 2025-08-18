import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PersonDetailPage from "./DetailPage";
import { vi, type Mock } from "vitest";

// Mock service
vi.mock("../services/swapi", () => ({
  fetchPersonWithHomeworld: vi.fn(),
}));

import { fetchPersonWithHomeworld } from "../services/swapi";


vi.mock("../components/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../components/ErrorMessage", () => ({
  default: ({ message }: { message: string }) => <div>{message}</div>,
}));

function renderWithRouter(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/people/${id}`]}>
      <Routes>
        <Route path="/people/:id" element={<PersonDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("PersonDetailPage", () => {
  it("renders loader while fetching", () => {
    (fetchPersonWithHomeworld as Mock).mockReturnValue(new Promise(() => {}));
    renderWithRouter("1");

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders error message if fetch fails", async () => {
    (fetchPersonWithHomeworld as Mock).mockRejectedValue(new Error("Failed"));

    renderWithRouter("1");

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to load person details./i)
      ).toBeInTheDocument()
    );
  });

  it("renders person details when fetch succeeds", async () => {
    (fetchPersonWithHomeworld as Mock).mockResolvedValue({
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "Blond",
      skin_color: "Fair",
      eye_color: "Blue",
      birth_year: "19BBY",
      gender: "Male",
      homeworld: {
        name: "Tatooine",
        climate: "Arid",
        population: "200000",
      },
    });

    renderWithRouter("1");

    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText(/172 cm/)).toBeInTheDocument();
    expect(screen.getByText(/77 kg/)).toBeInTheDocument();
    expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
    expect(screen.getByText(/Arid/)).toBeInTheDocument();
    expect(screen.getByText(/200000/)).toBeInTheDocument();
  });
});
