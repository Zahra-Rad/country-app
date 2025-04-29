import axios from "axios";

export interface Country {
  name: { common: string };
  capital: string[];
  population: number;
  area: number;
  flags: { png: string };
}

/**
 * Fetches all countries data from the REST Countries API
 * @returns Promise containing an array of Country objects
 */
export const fetchCountries = async (): Promise<Country[]> => {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  return data;
};