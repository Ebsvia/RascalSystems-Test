import { describe, it, expect, vi, beforeEach } from "vitest";
import { getResource, getResourceById, fetchPersonWithHomeworld } from "./swapi";

// Reset fetch mocks before each test
beforeEach(() => {
  vi.restoreAllMocks();
});

describe("SWAPI service", () => {
  it("getResource should fetch a paginated resource", async () => {
    // mock response
    const mockData = {
      count: 82,
      next: "https://swapi.py4e.com/api/people/?page=2",
      previous: null,
      results: [{ name: "Luke Skywalker" }],
    };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await getResource("people", 1);
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("https://swapi.py4e.com/api/people/?page=1");
  });

  it("getResourceById should fetch a single resource by id", async () => {
    const mockPerson = { name: "Darth Vader" };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockPerson,
    } as Response);

    const result = await getResourceById("people", "4");
    expect(result).toEqual(mockPerson);
    expect(fetch).toHaveBeenCalledWith("https://swapi.py4e.com/api/people/4/");
  });

  it("fetchPersonWithHomeworld should fetch person and their homeworld", async () => {
    const mockPerson = {
      name: "Leia Organa",
      height: "150",
      mass: "49",
      hair_color: "brown",
      skin_color: "light",
      eye_color: "brown",
      birth_year: "19BBY",
      gender: "female",
      homeworld: "https://swapi.py4e.com/api/planets/2/",
    };

    const mockHomeworld = {
      name: "Alderaan",
      climate: "temperate",
      population: "2000000000",
    };

    // first fetch = person
    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPerson,
      } as Response)
      // second fetch = homeworld
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockHomeworld,
      } as Response);

    const result = await fetchPersonWithHomeworld("5");
    expect(result).toEqual({
      name: "Leia Organa",
      height: "150",
      mass: "49",
      hair_color: "brown",
      skin_color: "light",
      eye_color: "brown",
      birth_year: "19BBY",
      gender: "female",
      homeworld: {
        name: "Alderaan",
        climate: "temperate",
        population: "2000000000",
      },
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, "https://swapi.py4e.com/api/people/5/");
    expect(fetch).toHaveBeenNthCalledWith(2, "https://swapi.py4e.com/api/planets/2/");
  });

  it("should throw error if fetch fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(getResource("people", 1)).rejects.toThrow("Failed to fetch people page 1");
  });
});
