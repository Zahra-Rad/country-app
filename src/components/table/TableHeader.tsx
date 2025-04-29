import React from "react";

interface TableHeaderProps {
  onSort: (column: string) => void;
}

export default function TableHeader({ onSort }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        <th>Flag</th>
        <th className="hover:bg-gray-100" onClick={() => onSort("name")}>
          Country Name
        </th>
        <th>Capital</th>
        <th className="hover:bg-gray-100" onClick={() => onSort("population")}>
          Population
        </th>
        <th className="hover:bg-gray-100" onClick={() => onSort("area")}>
          Area (km²)
        </th>
      </tr>
    </thead>
  );
}
