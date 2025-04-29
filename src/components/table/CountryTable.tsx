import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchCountries } from "../../services/api";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
export default function CountryTable() {
  const { data: countries = [], isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  return (
    <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-lg shadow">
            <table className="min-w-full bg-white border-collapse border md:table block overflow-x-auto">
              <TableHeader
                onSort={handleSort}
              />
              <TableBody countries={currentCountries} />
            </table>
          </div>
    </div>
  );
}
