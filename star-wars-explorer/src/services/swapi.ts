// src/services/swapi.ts

export interface PersonWithHomeworld {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: {
    name: string;
    climate?: string;
    population?: string;
  };
}

export interface ResourceListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const BASE = "https://swapi.py4e.com/api";

// 🔹 Generic paginated resource fetch
export async function getResource<T>(
  resourceType: string,
  page: number = 1
): Promise<ResourceListResponse<T>> {
  const res = await fetch(`${BASE}/${resourceType}/?page=${page}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${resourceType} page ${page}`);
  }
  return res.json();
}

// 🔹 Generic fetch for a single resource
export async function getResourceById<T>(
  resourceType: string,
  id: string
): Promise<T> {
  const res = await fetch(`${BASE}/${resourceType}/${id}/`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${resourceType} with ID ${id}`);
  }
  return res.json();
}

// 🔹 Person + Homeworld data
export async function fetchPersonWithHomeworld(id: string): Promise<PersonWithHomeworld> {
  // Get person
  const res = await fetch(`${BASE}/people/${id}/`);
  if (!res.ok) throw new Error(`Failed to fetch person with id ${id}`);
  const person = await res.json();

  // Get homeworld
  const hwRes = await fetch(person.homeworld);
  if (!hwRes.ok) throw new Error(`Failed to fetch homeworld for ${person.name}`);
  const hw = await hwRes.json();

  return {
    name: person.name,
    height: person.height,
    mass: person.mass,
    hair_color: person.hair_color,
    skin_color: person.skin_color,
    eye_color: person.eye_color,
    birth_year: person.birth_year,
    gender: person.gender,
    homeworld: {
      name: hw.name,
      climate: hw.climate,
      population: hw.population,
    },
  };
}
