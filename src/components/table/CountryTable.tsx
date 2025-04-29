// libraries
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// components and styles
import { fetchCountries } from "../../services/api";
import PopulationChart from "../chart/PopulationChart";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./CountryTable.module.css";

const COUNTRIES_PER_PAGE = 10;

export default function CountryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { data: countries = [], isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = sortColumn === "name"
        ? a.name.common.localeCompare(b.name.common)
        : sortColumn === "population"
        ? a.population - b.population
        : a.area - b.area;
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const indexOfLastCountry = currentPage * COUNTRIES_PER_PAGE;
  const indexOfFirstCountry = indexOfLastCountry - COUNTRIES_PER_PAGE;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  const totalPages = Math.ceil(filteredCountries.length / COUNTRIES_PER_PAGE);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error: Failed to fetch countries</div>;

  return (
    <div className="container mx-auto px-4">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by country name"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="overflow-hidden rounded-lg shadow">
            <table className="min-w-full bg-white border-collapse border md:table block overflow-x-auto">
              <TableHeader
                onSort={handleSort}
              />
              <TableBody countries={currentCountries} />
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <PopulationChart countries={filteredCountries} />
      </div>
    </div>
  );
}
