import axios from "axios";

const BASE_URL = "https://swapi.py4e.com/api/";

export interface ResourceListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getResource = async <T>(resourceType: string, page = 1): Promise<ResourceListResponse<T>> => {
  const res = await axios.get(`${BASE_URL}${resourceType}/?page=${page}`);
  return res.data;
};

export const getResourceDetail = async <T>(resourceType: string, id: string): Promise<T> => {
  const res = await axios.get(`${BASE_URL}${resourceType}/${id}/`);
  return res.data;
};
