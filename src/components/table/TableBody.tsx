import { Country } from "../../services/api";

interface TableBodyProps {
  countries: Country[];
}

export default function TableBody({ countries }: TableBodyProps) {
  return (
    <tbody>
      {countries.map((country) => (
        <tr key={country.name.common}>
          <td>
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-10 mx-auto"
            />
          </td>
          <td>{country.name.common}</td>
          <td>{country.capital?.[0] || "N/A"}</td>
          <td>{country.population.toLocaleString()}</td>
          <td>{country.area.toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  );
}
